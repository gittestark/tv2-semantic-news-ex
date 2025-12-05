export interface SearchResult {
  id: string
  title: string
  content: string
  source: string
  publishedDate: string
  relevanceScore: number
  metadata?: {
    author?: string
    category?: string
    tags?: string[]
  }
}

export interface SearchResponse {
  results: SearchResult[]
  totalCount: number
  query: string
}

export interface SearchError {
  message: string
  code?: string
}
