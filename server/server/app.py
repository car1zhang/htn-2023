import uvicorn
from fastapi import FastAPI
from .gcs.storage import download_file_into_memory, generate_download_link
from .gcs import stt as gcs_stt
from .assemblyai import stt as aai_sst
from pprint import pprint

from .util import find_dominant_speaker, convert_sec_to_timestamp

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
    speaker_text = []
    wordCounts = {}
    timeRanges = []
    for utterance in utterances:
        speaker = utterance.speaker
        if speaker not in wordCounts.keys:
            wordCounts[speaker] = utterance.words
        else:
            wordCounts[speaker] += utterance.words
            timeRanges.append((utterance.start, utterance.end))
    
    for sentence in stt.get_sentences():
        for i in range(len(timeRanges)):
            s,e = timeRanges[i]
            if s <= sentence.start <= e:
                print(f"({convert_sec_to_timestamp(sentence.start)}) {sentence.text}")
                speaker_text.append((convert_sec_to_timestamp(sentence.start), sentence.text))
                timeRanges = timeRanges[i:]
                continue

    return find_dominant_speaker(speaker_text)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)