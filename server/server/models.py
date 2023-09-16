import uuid
from typing import Optional
from pydantic import BaseModel, Field
import datetime

class Note(BaseModel):
  id: str = Field(default=uuid.uuid4(), alias="_id")
  title: str = "New Note"
  date: datetime.date = datetime.date.today()
  description: str = "A new keynote document"
  notes: str = "This is the content of a new keynote document"
  preprompt: str = ""
  recording_id: str = ""

class NoteUpdate(BaseModel):
  title: Optional[str]
  description: Optional[str]
  notes: Optional[str]
