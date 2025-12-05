export interface Article {
  id: string
  title: string
  excerpt: string
  full_text: string
  category: string
  published: string
  byline: string
  topics: string[]
}

export interface SearchResult {
  id: string
  title: string
  excerpt: string
  full_text: string
  category: string
  publishedDate: string
  byline: string
  topics: string[]
  relevanceScore: number
  highlightedSources?: string[]
}

export interface SearchInsights {
  previousAngles: string[]
  blindSpots: string[]
  suggestedNewAngles: string[]
  usedSources: string[]
  potentialFollowUpSources: string[]
  contradictions: string[]
  timeline: TimelineEvent[]
  coverageSummary: string
}

export interface TimelineEvent {
  date: string
  title: string
  category: string
}

export interface SearchResponse {
  results: SearchResult[]
  totalCount: number
  query: string
  insights?: SearchInsights
}

export interface SearchError {
  message: string
  code?: string
}
