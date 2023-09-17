import assemblyai as aai

aai.settings.api_key = "76e3b0bcc99347d1b26f484585ca075a"

def transcribe(audio_link: str):
    config = aai.TranscriptionConfig(speaker_labels=True)
    transcriber = aai.Transcriber(config=config)

    transcript = transcriber.transcribe(audio_link)
    return transcript