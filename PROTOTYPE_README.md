# TV2 Semantic News Explorer - UX Prototype

A semantic search interface prototype for TV2 journalists to discover and analyze previous news coverage using AI-powered insights.

## 🎯 Overview

This is a **UX-first prototype** using **fictional Danish news data** to demonstrate how journalists at TV2 could search and analyze their news archive using semantic search and AI assistance.

**Key Features:**
- Semantic search across 25 fictional Danish news articles
- AI-generated insights and coverage analysis
- Article detail view with source extraction
- Timeline visualization of coverage
- Suggested angles and blind spots
- Source recommendations for follow-up stories

## 📁 Project Structure

```
tv2-semantic-news-explorer/
├── src/
│   ├── components/
│   │   ├── ArticleDrawer.tsx       # Full article view in side drawer
│   │   ├── InsightsPanel.tsx       # AI-powered journalism insights
│   │   ├── ResultCard.tsx          # Search result card component
│   │   ├── SearchBar.tsx           # Search input component
│   │   ├── EmptyState.tsx          # Empty state messaging
│   │   └── LoadingState.tsx        # Loading indicator
│   ├── data/
│   │   └── articles.json           # 25 fictional Danish news articles
│   ├── lib/
│   │   ├── api.ts                  # Search API & AI insights generation
│   │   ├── types.ts                # TypeScript type definitions
│   │   └── utils.ts                # Utility functions
│   ├── App.tsx                     # Main application component
│   └── index.css                   # Theme and styling
├── PRD.md                          # Product requirements document
└── README.md                       # This file
```

## 🚀 How to Run

This prototype runs entirely in Spark (browser-based) with no external backend required.

1. **The app is already running** in your Spark environment
2. **Try a search query** like:
   - "Hvad har vi dækket om unges psykiske mistrivsel?"
   - "Fortæl mig om klimapolitik"
   - "Cyber angreb på hospitaler"

## 🔍 How It Works

### 1. **Fictional Data Set**

Located in `src/data/articles.json`, contains 25 realistic Danish news articles covering:

**Special Focus Cluster - Mental Health:**
- Young people using private psychologists due to wait times
- Rising wait times in public psychiatry
- Private clinics experiencing boom
- Political responses and criticism
- Expert warnings about inequality
- Student economic pressure

**Other Topics:**
- Electric vehicles and climate policy
- Cybercrime and data security
- Technology and AI developments
- Sports coverage
- Economic indicators
- International politics
- Infrastructure projects

Each article includes:
- `id`: Unique identifier
- `title`: Article headline
- `excerpt`: Brief summary
- `full_text`: Complete article text
- `category`: indland, udland, politik, erhverv, krimi, sport, breaking
- `published`: ISO timestamp
- `byline`: Author attribution
- `topics`: Array of tags

### 2. **Semantic Search Simulation**

**Current Implementation** (`src/lib/api.ts`):
- Simple relevance scoring based on term matching
- Searches across title, excerpt, full text, topics, and category
- Scores weighted by field importance
- Returns top 15 results sorted by relevance

**How it simulates semantic search:**
```typescript
function calculateSimpleRelevance(article: Article, query: string): number {
  // Breaks query into terms
  // Searches each field with different weights:
  // - Title match: +0.3
  // - Excerpt match: +0.2
  // - Topics match: +0.25
  // - Category match: +0.15
  // - Full text match: +0.1
}
```

### 3. **AI-Powered Insights Generation**

Uses Spark's built-in LLM API to generate journalism-specific insights:

```typescript
async function generateInsights(results: SearchResult[], query: string)
```

**Generates:**
- **Coverage Summary**: Overview of what TV2 has covered
- **Previous Angles**: List of approaches used in past articles
- **Blind Spots**: Areas not yet covered
- **Suggested New Angles**: Fresh story ideas
- **Used Sources**: Extracted from article text
- **Potential Follow-up Sources**: AI-suggested contacts
- **Timeline**: Chronological coverage visualization

**Source Extraction:**
Uses regex patterns to find quoted sources in Danish:
- "siger [Person]"
- "fortæller [Person]"
- "ifølge [Person]"

### 4. **UI Components**

**SearchBar** - Natural language query input
**ResultCard** - Shows article preview with relevance score
**ArticleDrawer** - Full article view with metadata and sources
**InsightsPanel** - AI assistant with journalistic analysis

## 🔧 Technology Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** components (v4)
- **Framer Motion** for animations
- **Phosphor Icons** for iconography
- **Spark LLM API** for AI insights
- **Vite** for build tooling

## 🎨 Design Decisions

### Color Palette
- **Primary**: Deep Teal (oklch(0.45 0.12 210)) - Intelligence & trust
- **Accent**: Warm Coral (oklch(0.70 0.15 35)) - Attention & energy
- **Background**: Soft white with subtle gradients

### Typography
- **Display**: Newsreader - Editorial sophistication
- **UI/Body**: Inter - Modern clarity

### Interactions
- Staggered card animations (50ms delay)
- Smooth drawer transitions
- Hover states on all interactive elements
- Mobile-responsive layout

## 🔌 Integration Points for Production

### Where to Connect AWS Bedrock

**File: `src/lib/api.ts`**

Replace the `searchArticles()` function to call your backend:

```typescript
export async function searchArticles(query: string): Promise<SearchResponse> {
  // PRODUCTION: Replace with actual Bedrock API call
  const response = await fetch(`${API_CONFIG.BEDROCK_API_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      knowledgeBaseId: API_CONFIG.BEDROCK_KNOWLEDGE_BASE_ID,
    }),
  })
  
  return response.json()
}
```

### Backend Requirements

Your backend should provide a `POST /search` endpoint that:

**Accepts:**
```json
{
  "query": "Hvad har vi dækket om klima?",
  "knowledgeBaseId": "your-kb-id"
}
```

**Returns:**
```json
{
  "results": [
    {
      "id": "article-id",
      "title": "Article Title",
      "excerpt": "Brief summary",
      "full_text": "Complete article text",
      "category": "indland",
      "publishedDate": "2024-03-15T08:30:00Z",
      "byline": "Af Author Name",
      "topics": ["tag1", "tag2"],
      "relevanceScore": 0.87,
      "highlightedSources": ["Source 1", "Source 2"]
    }
  ],
  "totalCount": 15,
  "query": "original query"
}
```

### Recommended Backend Architecture

```
Backend (Python FastAPI or Node/Express)
├── /search endpoint
├── AWS Bedrock Knowledge Base integration
│   ├── RetrieveAndGenerate API
│   └── Titan Embeddings for semantic search
├── Claude Sonnet 4.5 for insights generation
├── Source extraction (NLP/LLM)
└── Real TV2 article database connection
```

### Environment Variables

Create `.env` file:
```env
VITE_BEDROCK_API_URL=https://your-backend-api.com
VITE_BEDROCK_KB_ID=your-knowledge-base-id
VITE_AWS_REGION=eu-west-1
```

## 📊 Mock Data Details

### Article Distribution
- **Mental Health Theme**: 7 articles (cluster analysis)
- **Crime/Security**: 4 articles
- **Business/Economy**: 5 articles
- **Politics**: 3 articles
- **Sports**: 2 articles
- **Technology**: 2 articles
- **International**: 2 articles

### Date Range
All articles dated February-March 2024 to simulate recent coverage.

### Realistic Elements
- Danish writing style
- Realistic sources and quotes
- TV2 bylines
- Proper journalistic structure
- Category tags matching TV2 taxonomy

## 🎯 UX Goals Supported

✅ **Identifying previous coverage** - Semantic search finds related articles
✅ **Summarizing trends over time** - Timeline visualization
✅ **Avoiding double work** - See what's already been covered
✅ **Finding previous angles** - AI extracts approaches used
✅ **Recognizing blind spots** - AI suggests uncovered areas
✅ **Inspecting sources used** - Automatic source extraction
✅ **Suggesting follow-up sources** - AI recommends contacts
✅ **Understanding political context** - Cross-article analysis
✅ **Preparing new angles** - AI suggests fresh approaches

## 🚧 Prototype Limitations

This is a UX prototype with intentional limitations:

1. **Simple search algorithm** - Production needs embeddings-based search
2. **Small dataset** - Only 25 articles vs. thousands in production
3. **Simulated AI** - Uses general LLM vs. specialized journalism model
4. **No authentication** - Production needs user management
5. **No article editing** - Read-only interface
6. **No export features** - Production might need PDF/notes export
7. **No collaboration** - No sharing or team features

## 🔜 Next Steps for Production

### Phase 1: Backend Integration
- [ ] Set up AWS Bedrock Knowledge Base
- [ ] Implement Titan Embeddings for articles
- [ ] Create backend API with RetrieveAndGenerate
- [ ] Connect frontend to real backend

### Phase 2: Enhanced AI
- [ ] Fine-tune prompts for Danish journalism
- [ ] Implement Claude Sonnet 4.5 for better insights
- [ ] Add contradiction detection across articles
- [ ] Improve source extraction with NER

### Phase 3: Production Features
- [ ] User authentication (TV2 SSO)
- [ ] Save searches and bookmarks
- [ ] Export to Word/PDF
- [ ] Team collaboration features
- [ ] Article metadata editing
- [ ] Analytics dashboard

### Phase 4: Data Integration
- [ ] Connect to TV2's CMS/database
- [ ] Real-time article indexing
- [ ] External source database integration
- [ ] Archive search optimization

## 📝 Testing the Prototype

### Sample Queries to Try

**Mental Health Cluster:**
- "Hvad har vi dækket om unges psykiske mistrivsel?"
- "Private psykologer"
- "Ventetider i psykiatrien"

**Other Topics:**
- "Cyberkriminalitet"
- "Klimapolitik"
- "Elbiler"
- "Kunstig intelligens"

### Expected Behavior
1. Query returns relevant articles
2. AI insights panel appears on right
3. Click article to view full text in drawer
4. See extracted sources and topics
5. Review AI-suggested angles and blind spots

## 👥 User Personas

This prototype serves:

**Primary**: Investigative journalists researching story backgrounds
**Secondary**: Editors planning coverage strategy
**Tertiary**: Fact-checkers verifying previous reporting

## 📧 Questions?

This prototype demonstrates the UX vision for TV2's semantic news explorer. For production implementation, the backend team will need to integrate AWS Bedrock and connect to TV2's actual article database.

---

**Built with Spark** | **Fictional Data Only** | **UX Prototype**
