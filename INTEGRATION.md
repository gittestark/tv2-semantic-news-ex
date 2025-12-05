# TV2 Semantic News Explorer - Technical Documentation

## Integration Guide for Production Deployment

This document provides technical details for integrating the TV2 Semantic News Explorer prototype with AWS Bedrock Knowledge Base and production systems.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Current Implementation](#current-implementation)
3. [AWS Bedrock Integration](#aws-bedrock-integration)
4. [Backend Implementation Guide](#backend-implementation-guide)
5. [Data Pipeline](#data-pipeline)
6. [API Specifications](#api-specifications)
7. [Security Considerations](#security-considerations)
8. [Performance Optimization](#performance-optimization)
9. [Monitoring & Analytics](#monitoring--analytics)

---

## Architecture Overview

### Current Prototype Architecture

```
┌─────────────────────────────────────────┐
│         Spark Frontend (Browser)        │
│  ┌───────────────────────────────────┐  │
│  │       React Application           │  │
│  │  - Search Interface               │  │
│  │  - Results Display                │  │
│  │  - Article Drawer                 │  │
│  │  - AI Insights Panel              │  │
│  └───────────────┬───────────────────┘  │
│                  │                       │
│                  ▼                       │
│  ┌───────────────────────────────────┐  │
│  │      Local Search Engine          │  │
│  │  - Relevance Scoring              │  │
│  │  - Source Extraction              │  │
│  └───────────────┬───────────────────┘  │
│                  │                       │
│                  ▼                       │
│  ┌───────────────────────────────────┐  │
│  │        Spark LLM API              │  │
│  │  - Insight Generation             │  │
│  │  - GPT-4o-mini                    │  │
│  └───────────────────────────────────┘  │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │    Fictional Articles Dataset      │  │
│  │  - 25 Danish news articles        │  │
│  │  - JSON format                    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Production Target Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   Frontend (React/Spark)                      │
│  - Search Interface                                          │
│  - Results Display                                           │
│  - Article Drawer                                            │
│  - AI Insights Panel                                         │
└────────────────────┬─────────────────────────────────────────┘
                     │ HTTPS/REST
                     ▼
┌──────────────────────────────────────────────────────────────┐
│               Backend API (FastAPI/Node.js)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              /search Endpoint                         │   │
│  │  - Query validation                                   │   │
│  │  - Authentication                                     │   │
│  │  - Rate limiting                                      │   │
│  └───────────┬──────────────────────────────────────────┘   │
│              │                                                │
│              ▼                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      AWS Bedrock Knowledge Base Integration           │   │
│  │  - RetrieveAndGenerate API                            │   │
│  │  - Titan Embeddings v2                                │   │
│  │  - Claude Sonnet 4.5 for generation                   │   │
│  └───────────┬──────────────────────────────────────────┘   │
│              │                                                │
│              ▼                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         AI Insights Generation Layer                  │   │
│  │  - Claude Sonnet 4.5 for journalism insights          │   │
│  │  - Source extraction (NER)                            │   │
│  │  - Timeline construction                              │   │
│  └───────────┬──────────────────────────────────────────┘   │
└──────────────┼──────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                  AWS Bedrock Knowledge Base                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Vector Database (OpenSearch)             │   │
│  │  - Article embeddings                                 │   │
│  │  - Metadata indexing                                  │   │
│  │  - Semantic search                                    │   │
│  └───────────┬──────────────────────────────────────────┘   │
└──────────────┼──────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────────────────────┐
│                    Data Sources                               │
│  - TV2 CMS Database                                          │
│  - Article Archive                                           │
│  - Real-time feed                                            │
└──────────────────────────────────────────────────────────────┘
```

---

## Current Implementation

### File Structure

```
src/
├── components/
│   ├── ArticleDrawer.tsx        # Article detail view
│   ├── InsightsPanel.tsx        # AI insights display
│   ├── ResultCard.tsx           # Search result card
│   ├── SearchBar.tsx            # Search input
│   ├── EmptyState.tsx           # Empty/no results state
│   └── LoadingState.tsx         # Loading skeleton
├── data/
│   └── articles.json            # 25 fictional articles
├── lib/
│   ├── api.ts                   # Search & insights logic
│   ├── types.ts                 # TypeScript definitions
│   └── utils.ts                 # Utility functions
├── App.tsx                      # Main application
└── index.css                    # Theme & styling
```

### Key Functions

#### `searchArticles()` - Main Search Function
**Location**: `src/lib/api.ts`

```typescript
export async function searchArticles(query: string): Promise<SearchResponse>
```

**Current Implementation**:
1. Loads articles from JSON
2. Calculates relevance scores using term matching
3. Filters and sorts by relevance
4. Extracts sources from article text
5. Generates AI insights using Spark LLM API
6. Returns results + insights

**Replace for Production**: Call your backend API instead

#### `calculateSimpleRelevance()` - Scoring Algorithm
**Location**: `src/lib/api.ts`

```typescript
function calculateSimpleRelevance(article: Article, query: string): number
```

**Current Implementation**:
- Breaks query into terms
- Searches title, excerpt, full_text, topics, category
- Weighted scoring:
  - Title: 0.3
  - Excerpt: 0.2
  - Topics: 0.25
  - Category: 0.15
  - Full text: 0.1

**Replace for Production**: Use Bedrock's semantic similarity scores

#### `extractSources()` - Source Identification
**Location**: `src/lib/api.ts`

```typescript
function extractSources(text: string): string[]
```

**Current Implementation**:
- Regex patterns for Danish quoted sources
- Patterns: "siger X", "fortæller X", "ifølge X", "fra X"

**Enhance for Production**:
- Use NER (Named Entity Recognition)
- Integrate with source database
- Link to contact information

#### `generateInsights()` - AI Insights
**Location**: `src/lib/api.ts`

```typescript
async function generateInsights(results: SearchResult[], query: string): Promise<SearchInsights>
```

**Current Implementation**:
- Constructs prompt for Spark LLM (GPT-4o-mini)
- Requests JSON output with specific structure
- Parses and returns insights
- Fallback to basic insights if LLM fails

**Enhance for Production**:
- Use Claude Sonnet 4.5 for better Danish language understanding
- Fine-tune prompts for TV2's editorial standards
- Add caching for similar queries
- Implement contradiction detection

---

## AWS Bedrock Integration

### Prerequisites

1. **AWS Account** with Bedrock access
2. **Knowledge Base Created** in AWS Bedrock console
3. **S3 Bucket** for article storage
4. **IAM Roles** configured for Bedrock access

### Step 1: Create Knowledge Base

```bash
# Using AWS CLI
aws bedrock-agent create-knowledge-base \
  --name "tv2-news-archive" \
  --description "TV2 news article archive for semantic search" \
  --role-arn "arn:aws:iam::ACCOUNT:role/BedrockKBRole" \
  --knowledge-base-configuration '{
    "type": "VECTOR",
    "vectorKnowledgeBaseConfiguration": {
      "embeddingModelArn": "arn:aws:bedrock:eu-west-1::foundation-model/amazon.titan-embed-text-v2:0"
    }
  }' \
  --storage-configuration '{
    "type": "OPENSEARCH_SERVERLESS",
    "opensearchServerlessConfiguration": {
      "collectionArn": "arn:aws:aoss:eu-west-1:ACCOUNT:collection/COLLECTION-ID",
      "vectorIndexName": "tv2-articles",
      "fieldMapping": {
        "vectorField": "embedding",
        "textField": "text",
        "metadataField": "metadata"
      }
    }
  }'
```

### Step 2: Prepare Articles for Ingestion

**Format**: Each article should be a separate document

```json
{
  "id": "art-001",
  "title": "Article Title",
  "excerpt": "Brief summary",
  "full_text": "Complete article text...",
  "metadata": {
    "category": "indland",
    "published": "2024-03-15T08:30:00Z",
    "byline": "Af Sarah Mortensen",
    "topics": ["mental sundhed", "unge", "ventetider"]
  }
}
```

**Upload to S3**:
```bash
aws s3 cp articles/ s3://tv2-bedrock-articles/ --recursive
```

### Step 3: Create Data Source

```bash
aws bedrock-agent create-data-source \
  --knowledge-base-id "YOUR-KB-ID" \
  --name "tv2-articles-s3" \
  --data-source-configuration '{
    "type": "S3",
    "s3Configuration": {
      "bucketArn": "arn:aws:s3:::tv2-bedrock-articles"
    }
  }'
```

### Step 4: Start Ingestion Job

```bash
aws bedrock-agent start-ingestion-job \
  --knowledge-base-id "YOUR-KB-ID" \
  --data-source-id "YOUR-DS-ID"
```

---

## Backend Implementation Guide

### Option 1: Python with FastAPI

```python
# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
from typing import List, Optional

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-spark-app.com"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# Initialize Bedrock client
bedrock_agent = boto3.client(
    'bedrock-agent-runtime',
    region_name='eu-west-1'
)

class SearchRequest(BaseModel):
    query: str
    knowledgeBaseId: str

class SearchResponse(BaseModel):
    results: List[dict]
    totalCount: int
    query: str
    insights: Optional[dict] = None

@app.post("/search")
async def search(request: SearchRequest) -> SearchResponse:
    try:
        # Call Bedrock Knowledge Base
        response = bedrock_agent.retrieve_and_generate(
            input={
                'text': request.query
            },
            retrieveAndGenerateConfiguration={
                'type': 'KNOWLEDGE_BASE',
                'knowledgeBaseConfiguration': {
                    'knowledgeBaseId': request.knowledgeBaseId,
                    'modelArn': 'arn:aws:bedrock:eu-west-1::foundation-model/anthropic.claude-sonnet-4-5-v2:0',
                    'retrievalConfiguration': {
                        'vectorSearchConfiguration': {
                            'numberOfResults': 15
                        }
                    }
                }
            }
        )
        
        # Extract results
        citations = response['citations']
        results = []
        
        for citation in citations:
            for reference in citation['retrievedReferences']:
                article = {
                    'id': reference['metadata']['id'],
                    'title': reference['metadata']['title'],
                    'excerpt': reference['metadata']['excerpt'],
                    'full_text': reference['content']['text'],
                    'category': reference['metadata']['category'],
                    'publishedDate': reference['metadata']['published'],
                    'byline': reference['metadata']['byline'],
                    'topics': reference['metadata']['topics'],
                    'relevanceScore': reference['metadata'].get('score', 0.5),
                    'highlightedSources': extract_sources(reference['content']['text'])
                }
                results.append(article)
        
        # Generate insights
        insights = await generate_insights_bedrock(results, request.query)
        
        return SearchResponse(
            results=results,
            totalCount=len(results),
            query=request.query,
            insights=insights
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def generate_insights_bedrock(results: List[dict], query: str) -> dict:
    # Use Claude for insights generation
    bedrock_runtime = boto3.client('bedrock-runtime', region_name='eu-west-1')
    
    prompt = f"""Du er en erfaren dansk journalist og redaktør.
    
Analyser følgende søgeresultater og generer journalistiske insights.

Søgning: {query}
Antal artikler: {len(results)}

Generer JSON med:
- coverageSummary: kort opsummering
- previousAngles: liste af tidligere vinkler
- blindSpots: områder ikke dækket
- suggestedNewAngles: nye vinkelforslag
- potentialFollowUpSources: kildeforslag

Output kun valid JSON."""

    response = bedrock_runtime.invoke_model(
        modelId='anthropic.claude-sonnet-4-5-v2:0',
        body=json.dumps({
            'anthropic_version': 'bedrock-2023-05-31',
            'max_tokens': 2000,
            'messages': [{
                'role': 'user',
                'content': prompt
            }]
        })
    )
    
    result = json.loads(response['body'].read())
    insights = json.loads(result['content'][0]['text'])
    
    return insights

def extract_sources(text: str) -> List[str]:
    import re
    sources = []
    patterns = [
        r'siger ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)',
        r'fortæller ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)',
        r'ifølge ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)',
    ]
    for pattern in patterns:
        matches = re.findall(pattern, text)
        sources.extend([m.strip() for m in matches if len(m.strip()) < 50])
    return list(set(sources))[:5]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Option 2: Node.js with Express

```javascript
// backend/server.js
const express = require('express');
const cors = require('cors');
const { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } = require('@aws-sdk/client-bedrock-agent-runtime');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const app = express();
app.use(cors());
app.use(express.json());

const bedrockAgent = new BedrockAgentRuntimeClient({ region: 'eu-west-1' });
const bedrockRuntime = new BedrockRuntimeClient({ region: 'eu-west-1' });

app.post('/search', async (req, res) => {
  try {
    const { query, knowledgeBaseId } = req.body;
    
    // Call Bedrock Knowledge Base
    const command = new RetrieveAndGenerateCommand({
      input: { text: query },
      retrieveAndGenerateConfiguration: {
        type: 'KNOWLEDGE_BASE',
        knowledgeBaseConfiguration: {
          knowledgeBaseId,
          modelArn: 'arn:aws:bedrock:eu-west-1::foundation-model/anthropic.claude-sonnet-4-5-v2:0',
          retrievalConfiguration: {
            vectorSearchConfiguration: {
              numberOfResults: 15
            }
          }
        }
      }
    });
    
    const response = await bedrockAgent.send(command);
    
    // Process results
    const results = [];
    for (const citation of response.citations) {
      for (const ref of citation.retrievedReferences) {
        results.push({
          id: ref.metadata.id,
          title: ref.metadata.title,
          excerpt: ref.metadata.excerpt,
          full_text: ref.content.text,
          category: ref.metadata.category,
          publishedDate: ref.metadata.published,
          byline: ref.metadata.byline,
          topics: ref.metadata.topics,
          relevanceScore: ref.metadata.score || 0.5,
          highlightedSources: extractSources(ref.content.text)
        });
      }
    }
    
    // Generate insights
    const insights = await generateInsights(results, query);
    
    res.json({
      results,
      totalCount: results.length,
      query,
      insights
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: error.message });
  }
});

async function generateInsights(results, query) {
  const prompt = `Du er en erfaren dansk journalist og redaktør...`;
  
  const command = new InvokeModelCommand({
    modelId: 'anthropic.claude-sonnet-4-5-v2:0',
    body: JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
  });
  
  const response = await bedrockRuntime.send(command);
  const result = JSON.parse(new TextDecoder().decode(response.body));
  return JSON.parse(result.content[0].text);
}

function extractSources(text) {
  const patterns = [
    /siger ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
    /fortæller ([A-ZÆØÅ][a-zæøåA-ZÆØÅ\s]+?)(?:,|\.|\n)/g,
  ];
  const sources = new Set();
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      if (match[1].length < 50) sources.add(match[1].trim());
    }
  }
  return Array.from(sources).slice(0, 5);
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Frontend Integration

### Update `src/lib/api.ts`

Replace the `searchArticles()` function:

```typescript
export async function searchArticles(query: string): Promise<SearchResponse> {
  const endpoint = `${API_CONFIG.BEDROCK_API_URL}/search`
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`, // Add authentication
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
```

### Environment Variables

Create `.env` file:

```env
VITE_BEDROCK_API_URL=https://api.tv2.dk/semantic-search
VITE_BEDROCK_KB_ID=XXXXXXXXXX
VITE_AWS_REGION=eu-west-1
```

---

## Data Pipeline

### Continuous Article Ingestion

```python
# scripts/ingest_articles.py
import boto3
import json
from datetime import datetime

s3 = boto3.client('s3')
bedrock = boto3.client('bedrock-agent')

def ingest_new_articles(articles):
    """Upload articles to S3 and trigger ingestion"""
    bucket = 'tv2-bedrock-articles'
    
    for article in articles:
        # Format article
        doc = {
            'id': article['id'],
            'title': article['title'],
            'excerpt': article['excerpt'],
            'full_text': article['full_text'],
            'metadata': {
                'category': article['category'],
                'published': article['published'],
                'byline': article['byline'],
                'topics': article['topics']
            }
        }
        
        # Upload to S3
        key = f"articles/{article['id']}.json"
        s3.put_object(
            Bucket=bucket,
            Key=key,
            Body=json.dumps(doc),
            ContentType='application/json'
        )
    
    # Trigger ingestion job
    bedrock.start_ingestion_job(
        knowledgeBaseId='YOUR-KB-ID',
        dataSourceId='YOUR-DS-ID'
    )

# Schedule this to run periodically (e.g., every hour)
```

---

## Security Considerations

### Authentication
- Implement JWT-based authentication
- Integrate with TV2's SSO system
- Store tokens securely

### Authorization
- Role-based access control (RBAC)
- Journalists vs. editors vs. administrators
- Audit logging for all searches

### Data Privacy
- Anonymize personal data in articles
- Comply with GDPR
- Secure transmission (HTTPS only)

### Rate Limiting
```python
from fastapi import Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/search")
@limiter.limit("60/minute")  # 60 requests per minute
async def search(request: Request, search_request: SearchRequest):
    # ... existing code
```

---

## Performance Optimization

### Caching Strategy

```python
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def get_cached_search(query_hash):
    # Return cached results if available
    pass

@app.post("/search")
async def search(request: SearchRequest):
    query_hash = hashlib.md5(request.query.encode()).hexdigest()
    
    # Check cache first
    cached = get_cached_search(query_hash)
    if cached:
        return cached
    
    # ... perform search ...
```

### Database Indexing
- Index by category, published date, topics
- Use composite indexes for common queries
- Regular index maintenance

---

## Monitoring & Analytics

### Metrics to Track

1. **Search Performance**
   - Query latency
   - Result relevance (user feedback)
   - Cache hit rate

2. **Usage Analytics**
   - Searches per day
   - Most common queries
   - User engagement (clicks, drawer opens)

3. **System Health**
   - API uptime
   - Error rates
   - Bedrock API costs

### Implementation

```python
from prometheus_client import Counter, Histogram
import time

search_counter = Counter('search_requests_total', 'Total search requests')
search_latency = Histogram('search_duration_seconds', 'Search duration')

@app.post("/search")
async def search(request: SearchRequest):
    search_counter.inc()
    
    start_time = time.time()
    # ... perform search ...
    duration = time.time() - start_time
    
    search_latency.observe(duration)
    
    # ... return results
```

---

## Deployment Checklist

- [ ] AWS Bedrock Knowledge Base created and populated
- [ ] Backend API deployed and tested
- [ ] Frontend updated with production API endpoint
- [ ] Environment variables configured
- [ ] Authentication implemented
- [ ] Rate limiting enabled
- [ ] Monitoring dashboards set up
- [ ] Error logging configured
- [ ] Load testing completed
- [ ] Documentation updated
- [ ] Team training completed

---

## Support & Maintenance

### Regular Tasks
- Weekly: Review search analytics
- Monthly: Update article embeddings
- Quarterly: Fine-tune AI prompts
- Annually: Review and optimize costs

### Troubleshooting
- Check CloudWatch logs for errors
- Monitor Bedrock API usage and quotas
- Review user feedback and adjust relevance scoring

---

**Document Version**: 1.0
**Last Updated**: 2024-03-20
**Contact**: Technical Team Lead
