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
    contents = blob.download_as_string()

    return contents

if __name__ == "__main__":
    print(download_file_into_memory("Upgrade instructions.txt"))