from google.cloud import speech_v1p1beta1 as speech

def transcribe(filebytes: bytes):
    
    client = speech.SpeechClient()
    audio = speech.RecognitionAudio(content=filebytes)

    diarization_config = speech.SpeakerDiarizationConfig(
        enable_speaker_diarization=True,
        min_speaker_count=1,
        max_speaker_count=5,
    )

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        # sample_rate_hertz=8000,
        language_code="en-US",
        diarization_config=diarization_config,
        audio_channel_count=1,
        enable_word_time_offsets=True,
        enable_separate_recognition_per_channel=False,
        enable_automatic_punctuation=True,
    )

    print("Waiting for operation to complete...")
    response = client.recognize(config=config, audio=audio)

    print(response.results)

    # The transcript within each result is separate and sequential per result.
    # However, the words list within an alternative includes all the words
    # from all the results thus far. Thus, to get all the words with speaker
    # tags, you only have to take the words list from the last result:
    result = response.results[-1]

    print("Transcript", result.alternatives[0].transcript)

    # print(result)

    words_info = result.alternatives[0].words

    # Printing out the output:
    for word_info in words_info:
        print(f"word: '{word_info.word}', speaker_tag: {word_info.speaker_tag}")

    return [
        (
            word_info.word,
            word_info.speaker_tag
        ) for word_info in result.alternatives[0].words
    ]