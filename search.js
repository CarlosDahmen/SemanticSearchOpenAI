import 'dotenv/config'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { movies } from './movies.js'

const createStore = () =>
  MemoryVectorStore.fromDocuments(
    movies.map(
      (movie) =>
        new Document({
          pageContent: `Title: ${movie.title}\n${movie.description}`,
          metadata: { source: movie.id, title: movie.title },
        })
    ),
    new OpenAIEmbeddings({ apiKey: process.env.OPENAI_API_KEY })
  )

const search = async (query, count = 1) => {
  const store = await createStore()
  return store.similaritySearch(query, count)
}

console.log(await search('sci-fi and action'))
