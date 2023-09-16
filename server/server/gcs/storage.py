import datetime
from pydub import AudioSegment
from pydub.playback import play
import io

from google.cloud import storage

BUCKET_NAME = "keynote-videos"

def download_file_into_memory(blob_name: str):
    client = storage.Client()

    bucket = client.bucket(BUCKET_NAME)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(blob_name)
    contents = blob.download_as_bytes()
    print(contents[0:100])
    return contents

def generate_download_link(blob_name, expiration_time=3600):
    """
    Generates a signed URL for a blob, which provides temporary access to the blob.

    Parameters:
    - blob_name: The name of the blob in the bucket.
    - expiration_time: Time in seconds for which the link is valid. Default is 1 hour.

    Returns:
    - A signed URL providing temporary access to the blob.
    """
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(blob_name)

    print("generating signed url...")
    # Generate the signed URL
    url = blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(seconds=expiration_time),
        method="GET"
    )
    print(url)
    return url

if __name__ == "__main__":
    audio_bytes = download_file_into_memory("untitled.wav")
    song = AudioSegment.from_file(io.BytesIO(audio_bytes), format="wav")
    play(song)


