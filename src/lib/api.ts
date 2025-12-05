import type { SearchResponse } from './types'

export const API_CONFIG = {
  BEDROCK_API_URL: import.meta.env.VITE_BEDROCK_API_URL || 'http://localhost:8000',
  BEDROCK_KNOWLEDGE_BASE_ID: import.meta.env.VITE_BEDROCK_KB_ID || '',
  AWS_REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1',
}

export async function searchKnowledgeBase(query: string): Promise<SearchResponse> {
  const endpoint = `${API_CONFIG.BEDROCK_API_URL}/search`
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      knowledgeBaseId: API_CONFIG.BEDROCK_KNOWLEDGE_BASE_ID,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`)
  }
  
  return response.json()
}

export async function mockSearch(query: string): Promise<SearchResponse> {
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  const mockResults = [
    {
      id: '1',
      title: 'Climate Summit 2024: World Leaders Agree on Carbon Reduction Targets',
      content: 'In a historic agreement reached at the Climate Summit 2024, world leaders have committed to ambitious carbon reduction targets. The comprehensive framework includes specific milestones for renewable energy adoption and phasing out fossil fuel subsidies by 2030.',
      source: 'TV2 News',
      publishedDate: '2024-01-15T10:30:00Z',
      relevanceScore: 0.95,
      metadata: {
        author: 'Sarah Nielsen',
        category: 'Environment',
        tags: ['climate', 'politics', 'international'],
      },
    },
    {
      id: '2',
      title: 'New Electric Vehicle Infrastructure Plan Unveiled',
      content: 'The government announced a comprehensive plan to expand electric vehicle charging infrastructure across the country. The initiative includes 50,000 new charging stations and significant investments in battery technology research.',
      source: 'TV2 Business',
      publishedDate: '2024-01-14T14:20:00Z',
      relevanceScore: 0.87,
      metadata: {
        author: 'Lars Andersen',
        category: 'Transportation',
        tags: ['electric vehicles', 'infrastructure', 'climate'],
      },
    },
    {
      id: '3',
      title: 'Renewable Energy Now Powers 60% of National Grid',
      content: 'Denmark reaches a significant milestone as renewable energy sources now account for 60% of the national power grid. Wind and solar installations have exceeded expectations, with officials projecting 80% renewable energy by 2027.',
      source: 'TV2 News',
      publishedDate: '2024-01-13T09:15:00Z',
      relevanceScore: 0.82,
      metadata: {
        author: 'Mette Jensen',
        category: 'Energy',
        tags: ['renewable energy', 'wind power', 'solar'],
      },
    },
    {
      id: '4',
      title: 'Tech Giants Commit to Carbon Neutral Data Centers',
      content: 'Major technology companies have pledged to make all data centers carbon neutral by 2025. The commitment includes transitioning to 100% renewable energy and implementing advanced cooling technologies to reduce energy consumption.',
      source: 'TV2 Tech',
      publishedDate: '2024-01-12T16:45:00Z',
      relevanceScore: 0.78,
      metadata: {
        author: 'Jonas Christensen',
        category: 'Technology',
        tags: ['technology', 'climate', 'data centers'],
      },
    },
  ]
  
  const filteredResults = query.length > 0 
    ? mockResults.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.content.toLowerCase().includes(query.toLowerCase()) ||
        r.metadata?.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : mockResults
  
  return {
    results: filteredResults,
    totalCount: filteredResults.length,
    query,
  }
}
