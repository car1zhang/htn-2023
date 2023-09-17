import uvicorn
from fastapi import FastAPI
from .gcs.storage import download_file_into_memory, generate_download_link
from .gcs import stt as gcs_stt
from .assemblyai import stt as aai_sst
from pprint import pprint

from .util.find_dominant_speaker import find_dominant_speaker
from .util.convert_sec_to_timestamp import seconds_to_timestamp
from .cohere.genTitle import gen_title

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
    pprint(utterances)

    print([sentence.text for sentence in stt.get_sentences()])

    # For each utterance, print its speaker and what was said
    speaker_text = []
    wordCounts = {}
    timeRanges = []
    for utterance in utterances:
        speaker = utterance.speaker
        if speaker not in wordCounts.keys():
            wordCounts[speaker] = utterance.words
        else:
            wordCounts[speaker] += utterance.words
        timeRanges.append((speaker, utterance.start, utterance.end))
    
    # dominant_speaker_key = wordCounts[max(wordCounts, key=wordCounts.get)]
    dominant_speaker_key = sorted(wordCounts.keys(), key=lambda speaker_key: len(wordCounts[speaker_key]), reverse=True)[0]
    timeRanges = [timeRange for timeRange in timeRanges if timeRange[0] == dominant_speaker_key]

    for sentence in stt.get_sentences():
        for i, (_, start, end) in enumerate(timeRanges):
            # _, start, end = ele
            if start <= sentence.start <= end:
                speaker_text.append((seconds_to_timestamp(sentence.start//1000), sentence.text))
                timeRanges = timeRanges[i:]
                continue

    notes = []
    i=0
    while i < len(speaker_text):
        batch = speaker_text[i:i+20]
        startTime = batch[0][0]
        batch = "".join([f"{i}. {text}\n" for i, text in enumerate(batch)])
        notes.append((startTime, gen_title(batch)))
        i = min(i+20, len(speaker_text))
        if i == len(speaker_text):
            break

    return notes

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)