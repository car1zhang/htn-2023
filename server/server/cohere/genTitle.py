import cohere 
co = cohere.Client(f"bFlGhfFebfCjRFPvseWOAp0riM6K0GBtREcjWVYF")

def get_short_description(transcript: str):
    response = co.summarize( 
    text=transcript,
    length='short',
    format='paragraph',
    model='command',
    additional_command='in 3rd person, write a short summary of what is discussed in the input provided',
    temperature=0.3,
    ) 
    return response.summary

def get_title(transcript: str):
    response = co.summarize( 
    text=transcript,
    length='short',
    format='paragraph',
    model='command',
    additional_command='create a 10 word title describing the input',
    temperature=0.3,
    ) 
    return response.summary

def gen_notes(chunk: str):
    response = co.generate(
        model='command',
        prompt='Write bullet point notes that summarise the following information, ignoring non-technical information, phrases and fluff\nUse an objective, 3rd person tone.\n\n1.' + chunk,
        max_tokens=952,
        temperature=0.4,
        k=0,
        stop_sequences=[],
        return_likelihoods='NONE')
    return response.generations[0].text
