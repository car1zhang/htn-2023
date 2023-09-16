import uvicorn
from fastapi import FastAPI
from .gcs.storage import download_file_into_memory, generate_download_link
from .gcs import stt as gcs_stt
from .assemblyai import stt as aai_sst
from pprint import pprint

from .util.find_dominant_speaker import find_dominant_speaker

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/transcribe")
async def transcribe_audio(blob_name: str):
    audio_bytes =  download_file_into_memory(blob_name)
    stt = gcs_stt.transcribe(audio_bytes)
    return stt

@app.post("/transcribe-aai")
async def transcribe_audio_aai(blob_name: str):
    audio_link = generate_download_link(blob_name)
    stt = aai_sst.transcribe(audio_link)
    
    # extract all utterances from the response
    utterances = stt.utterances

    # For each utterance, print its speaker and what was said
    speaker_text = {}
    for utterance in utterances:
        speaker = utterance.speaker
        text = utterance.text
        start_time = utterance.start

        if speaker not in speaker_text:
            speaker_text[speaker] = {
                "key": speaker,
                "sentences": [(start_time, text)],
                "words": len(text.split())
            }
        else:
            speaker_text[speaker]["sentences"].append((start_time, text))
            speaker_text[speaker]["words"] += len(text.split())
    
    # pprint(speaker_text)
    # pprint(find_dominant_speaker(speaker_text))
    

    # return {
    #     "transcript": stt.text,
    #     "speaker_text": speaker_text
    # }

    return find_dominant_speaker(speaker_text)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)