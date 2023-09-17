from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from typing import List

from server.cohere.semanticSearch import getTopFiveRelevantThings

from .models import Note, NoteUpdate

router = APIRouter()

@router.get("/", response_description="Get all notes", response_model=List[Note])
def get_notes(request: Request):
  notes = list(request.app.database["notes"].find())
  for note in notes:
    note['_id'] = str(note['_id'])
  return notes

@router.get("/{id}", response_description="Get note by id", response_model=Note)
def get_note(id: str, request: Request):
  if(note := request.app.database["notes"].find_one({"_id": id})) is not None:
    note['_id'] = str(note['_id'])
    return note
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with ID {id} not found")

@router.post("/", response_description="Post a new note", status_code=status.HTTP_201_CREATED, response_model=Note)
def post_note(request: Request, note: Note = Body(...)):
  note = jsonable_encoder(note)
  new_note = request.app.database["notes"].insert_one(note)
  created_note = request.app.database["notes"].find_one(
      {"_id": new_note.inserted_id}
  )
  return created_note

@router.put("/{id}", response_description="Update a note", response_model=Note) # non edited fields should pass null
def update_note(id: str, request: Request, note: NoteUpdate = Body(...)):
  note = {k: v for k, v in note.dict().items() if v is not None}
  if len(note) >= 1:
    update_result = request.app.database["notes"].update_one(
      {"_id": id}, {"$set": note}
    )
    if update_result.modified_count == 0:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with ID {id} not found")

  if (
    existing_note := request.app.database["notes"].find_one({"_id": id})
  ) is not None:
    return existing_note
  
  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with ID {id} not found")

@router.delete("/{id}", response_description="Delete a note")
def delete_book(id: str, request: Request, response: Response):
  delete_result = request.app.database["notes"].delete_one({"_id": id})

  if delete_result.deleted_count == 1:
    response.status_code = status.HTTP_204_NO_CONTENT
    return response

  raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Note with ID {id} not found")

@router.get("/search/{query}", response_description="Get top five related documents using reranking", response_model=List[str])
def get_search_results(query: str, request: Request):
  docs = list(request.app.database["notes"].find())
  for doc in docs:
    doc['description'] = str(doc['description'])
  return getTopFiveRelevantThings(query, docs)
