import uvicorn
from fastapi import FastAPI
from .gcs.storage import download_file_into_memory
from .gcs.stt import transcribe

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/transcribe")
async def transcribe_audio(blob_name: str):
    audio_bytes =  download_file_into_memory(blob_name)
    stt = transcribe(audio_bytes)
    return stt

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)