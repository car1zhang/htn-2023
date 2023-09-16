from .convert_sec_to_timestamp import seconds_to_timestamp

def find_dominant_speaker(speaker_info: dict[str, dict]):
    assert len(speaker_info) != 0, "No speakers in speaker info"

    dominant_speaker_key = sorted(speaker_info.keys(), key=lambda speaker_key: speaker_info[speaker_key]["words"], reverse=True)[0]
    dominant_speaker = speaker_info[dominant_speaker_key]

    # Also combine their sentences into transcript form
    dominant_speaker_transcript = '\n'.join(map(lambda x: f"({seconds_to_timestamp(x[0] / 1000)}) {x[1]}", dominant_speaker["sentences"]))
    print(dominant_speaker_transcript)
    dominant_speaker["transcript"] = dominant_speaker_transcript

    return dominant_speaker