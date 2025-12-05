import type { SearchResponse, Article, SearchResult, SearchInsights } from './types'
import articlesData from '@/data/articles.json'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
  llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
}

export const API_CONFIG = {
  BEDROCK_API_URL: import.meta.env.VITE_BEDROCK_API_URL || 'http://localhost:8000',
  BEDROCK_KNOWLEDGE_BASE_ID: import.meta.env.VITE_BEDROCK_KB_ID || '',
  AWS_REGION: import.meta.env.VITE_AWS_REGION || 'us-east-1',
}

const articles: Article[] = articlesData as Article[]

function calculateSimpleRelevance(article: Article, query: string): number {
  const lowerQuery = query.toLowerCase()
  const queryTerms = lowerQuery.split(' ').filter(t => t.length > 2)
  
  let score = 0
  
  queryTerms.forEach(term => {
    if (article.title.toLowerCase().includes(term)) score += 0.3
    if (article.excerpt.toLowerCase().includes(term)) score += 0.2
    if (article.full_text.toLowerCase().includes(term)) score += 0.1
    if (article.topics.some(t => t.toLowerCase().includes(term))) score += 0.25
    if (article.category.toLowerCase().includes(term)) score += 0.15
  })
  
  return Math.min(score, 1)
}

function extractSources(text: string): string[] {
  const sources: string[] = []
  const patterns = [
    /siger ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
    /fortæller ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
    /ifølge ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
    /fra ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
  ]
  
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const source = match[1].trim()
      if (source.length > 3 && source.length < 50 && !sources.includes(source)) {
        sources.push(source)
      }
    }
  })
  
  return sources.slice(0, 5)
}

async function generateInsights(results: SearchResult[], query: string): Promise<SearchInsights> {
  const allTopics = [...new Set(results.flatMap(r => r.topics))]
  const timeline = results
    .map(r => ({
      date: r.publishedDate,
      title: r.title,
      category: r.category
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  const allSources = [...new Set(results.flatMap(r => r.highlightedSources || []))]
  
  const prompt = spark.llmPrompt`Du er en erfaren dansk journalist og redaktør.

Analyser følgende søgeresultater fra TV2's nyhedsarkiv og generer journalistiske insights.

Søgning: ${query}

Artikler fundet: ${results.length}

Emner dækket: ${allTopics.join(', ')}

Generer følgende i JSON-format:

{
  "coverageSummary": "En kort opsummering (2-3 sætninger) af hvad TV2 tidligere har dækket på dette område",
  "previousAngles": ["Liste af 3-5 vinkler vi har brugt tidligere"],
  "blindSpots": ["Liste af 2-4 mulige områder vi IKKE har dækket endnu"],
  "suggestedNewAngles": ["Liste af 3-5 konkrete nye vinkler til kommende artikler"],
  "potentialFollowUpSources": ["Liste af 3-5 mulige kilder vi kunne kontakte for nye historier"]
}

Vær konkret, journalistisk og dansk.`

  try {
    const response = await spark.llm(prompt, 'gpt-4o-mini', true)
    const parsed = JSON.parse(response)
    
    return {
      coverageSummary: parsed.coverageSummary || 'Ingen opsummering tilgængelig.',
      previousAngles: parsed.previousAngles || [],
      blindSpots: parsed.blindSpots || [],
      suggestedNewAngles: parsed.suggestedNewAngles || [],
      usedSources: allSources,
      potentialFollowUpSources: parsed.potentialFollowUpSources || [],
      contradictions: [],
      timeline
    }
  } catch (error) {
    console.error('Failed to generate insights:', error)
    
    return {
      coverageSummary: `Vi har fundet ${results.length} artikler relateret til "${query}".`,
      previousAngles: allTopics.slice(0, 4).map(t => `Historier om ${t}`),
      blindSpots: ['Internationale perspektiver', 'Økonomiske konsekvenser'],
      suggestedNewAngles: ['Opfølgning på seneste udvikling', 'Interview med nye kilder'],
      usedSources: allSources,
      potentialFollowUpSources: ['Eksperter fra universiteter', 'Relevante ministerier'],
      contradictions: [],
      timeline
    }
  }
}

export async function searchArticles(query: string): Promise<SearchResponse> {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const results: SearchResult[] = articles
    .map(article => ({
      ...article,
      publishedDate: article.published,
      relevanceScore: calculateSimpleRelevance(article, query),
      highlightedSources: extractSources(article.full_text)
    }))
    .filter(result => result.relevanceScore > 0.05)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 15)
  
  const insights = results.length > 0 ? await generateInsights(results, query) : undefined
  
  return {
    results,
    totalCount: results.length,
    query,
    insights
  }
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
