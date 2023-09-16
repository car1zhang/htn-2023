import uvicorn
from fastapi import FastAPI
from pymongo import MongoClient
from .routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient("mongodb+srv://user1:0HzAtrSsEL4CiNEu@cluster0.arp8spe.mongodb.net/")
    app.database = app.mongodb_client["keynote"]

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(router, prefix="/notes")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
