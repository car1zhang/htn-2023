import cohere 
co = cohere.Client(f"60t30veschZlra1cDn6auatOgcI26ySvpkKdFz4B")

# Get top five related documents using reranking
def getTopFiveRelevantThings(query, docs):
    results = co.rerank(query=query, documents=docs, top_n=2, model='rerank-english-v2.0') # Change top_n to change the number of results returned. If top_n is not passed, all results will be returned.
    searchRes = [result.index for result in results]
    return searchRes
