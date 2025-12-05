# TV2 Semantic News Explorer - Integration Guide

## Overview

This React application provides a complete frontend for semantic news search. It's designed to connect with an AWS Bedrock Knowledge Base backend but currently runs with mock data for prototyping.

## Current State: Mock Mode

The application is currently running with **mock search functionality** that simulates API responses. This allows you to:
- Test and demo the complete UI/UX
- Develop frontend features independently
- Validate the user experience before backend integration

## Connecting to AWS Bedrock Knowledge Base

### Step 1: Backend Setup

You need a backend service (FastAPI, Express, etc.) that:
1. Accepts POST requests to `/search`
2. Calls AWS Bedrock Knowledge Base API
3. Returns results in the expected format

#### Python/FastAPI Example

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import boto3
from pydantic import BaseModel

app = FastAPI()

# Configure CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AWS Bedrock client
bedrock_agent_runtime = boto3.client(
    'bedrock-agent-runtime',
    region_name='us-east-1',  # Your AWS region
    aws_access_key_id='YOUR_ACCESS_KEY',
    aws_secret_access_key='YOUR_SECRET_KEY'
)

KNOWLEDGE_BASE_ID = 'your-kb-id-here'

class SearchRequest(BaseModel):
    query: str
    knowledgeBaseId: str

@app.post("/search")
async def search(request: SearchRequest):
    try:
        response = bedrock_agent_runtime.retrieve(
            knowledgeBaseId=request.knowledgeBaseId,
            retrievalQuery={
                'text': request.query
            }
        )
        
        # Transform Bedrock response to expected format
        results = []
        for item in response.get('retrievalResults', []):
            results.append({
                'id': item['location']['s3Location']['uri'],
                'title': item['content']['text'][:100],  # Extract title from content
                'content': item['content']['text'],
                'source': item['location']['s3Location']['uri'],
                'publishedDate': item.get('metadata', {}).get('date', '2024-01-01T00:00:00Z'),
                'relevanceScore': item.get('score', 0.5),
                'metadata': {
                    'category': item.get('metadata', {}).get('category', 'General')
                }
            })
        
        return {
            'results': results,
            'totalCount': len(results),
            'query': request.query
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Step 2: Environment Configuration

Create a `.env` file in the root of this project:

```env
# Backend API endpoint
VITE_BEDROCK_API_URL=http://localhost:8000

# AWS Bedrock Knowledge Base ID
VITE_BEDROCK_KB_ID=your-knowledge-base-id-here

# AWS Region
VITE_AWS_REGION=us-east-1
```

**Important Security Note:** Never commit AWS credentials to the frontend. All AWS authentication should happen in your backend service.

### Step 3: Switch from Mock to Real API

In `/src/App.tsx`, change the import:

```typescript
// Change this:
import { mockSearch } from '@/lib/api'

// To this:
import { searchKnowledgeBase } from '@/lib/api'
```

Then update the handleSearch function:

```typescript
const handleSearch = async (query: string) => {
  setIsLoading(true)
  setError(null)
  setHasSearched(true)
  setCurrentQuery(query)
  
  try {
    // Change mockSearch to searchKnowledgeBase
    const response = await searchKnowledgeBase(query)
    setResults(response.results)
    
    toast.success(`Found ${response.totalCount} results`, {
      description: `Semantic search for: "${query}"`,
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
    setError(errorMessage)
    toast.error('Search failed', {
      description: errorMessage,
    })
  } finally {
    setIsLoading(false)
  }
}
```

## API Contract

Your backend must return responses matching this TypeScript interface:

```typescript
interface SearchResponse {
  results: Array<{
    id: string                    // Unique identifier
    title: string                 // Article headline
    content: string               // Article body/preview
    source: string                // Source publication
    publishedDate: string         // ISO 8601 date string
    relevanceScore: number        // 0.0 to 1.0
    metadata?: {
      author?: string
      category?: string
      tags?: string[]
    }
  }>
  totalCount: number              // Total results found
  query: string                   // The search query
}
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx         # Search input component
│   ├── ResultCard.tsx        # Individual result display
│   ├── EmptyState.tsx        # No results / initial state
│   ├── LoadingState.tsx      # Loading skeletons
│   └── ui/                   # shadcn components
├── lib/
│   ├── api.ts               # API integration (CONFIGURE THIS)
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utility functions
├── App.tsx                  # Main application
└── index.css                # Styles and theme
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Customization Points

### 1. Result Transformation
Edit `/src/lib/api.ts` to transform Bedrock responses to match the UI expectations.

### 2. Styling
Modify `/src/index.css` to adjust colors, fonts, and theme.

### 3. Search Behavior
Update `/src/components/SearchBar.tsx` for different input validation or UX.

### 4. Result Display
Customize `/src/components/ResultCard.tsx` to show different metadata or formatting.

## AWS Bedrock Resources

- [Bedrock Knowledge Bases Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [Bedrock Agent Runtime API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_Retrieve.html)
- [AWS SDK for Python (Boto3)](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-agent-runtime.html)

## Troubleshooting

### CORS Errors
Ensure your backend has CORS properly configured to allow requests from your frontend origin.

### Environment Variables Not Loading
Vite requires environment variables to be prefixed with `VITE_` and the dev server must be restarted after changes.

### Type Mismatches
If Bedrock returns data in a different format, update the transformation logic in your backend or in `/src/lib/api.ts`.

## Next Steps

1. Set up your Python FastAPI backend
2. Configure AWS credentials (backend only)
3. Create/identify your Bedrock Knowledge Base
4. Update environment variables
5. Switch from mock to real API
6. Test end-to-end integration
