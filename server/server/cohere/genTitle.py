import cohere 
co = cohere.Client(f"{API_KEY}")

def get_short_description(transcript: str):
    response = co.summarize( 
    text=transcript,
    length='short',
    format='paragraph',
    model='command',
    additional_command='in 3rd person, write a short summary of what is discussed in the input provided',
    temperature=0.3,
    ) 
    print('Summary:', response.summary)

def get_title(transcript: str):
    response = co.summarize( 
    text=transcript,
    length='short',
    format='paragraph',
    model='command',
    additional_command='create a 10 word title describing the input',
    temperature=0.3,
    ) 
    print('Summary:', response.summary)
