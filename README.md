# TV2 Semantic News Explorer

A production-ready React application for semantic news search, designed to integrate with AWS Bedrock Knowledge Bases.

## Features

- 🔍 **Semantic Search** - Natural language queries powered by AI
- 🎨 **Modern UI** - Clean, professional interface with smooth animations
- 📊 **Relevance Scoring** - Visual indicators of result relevance
- 🚀 **Fast & Responsive** - Optimized performance with loading states
- 🔌 **Easy Integration** - Ready to connect to AWS Bedrock
- 🎭 **Mock Mode** - Fully functional with sample data for development

## Quick Start

### Development Mode (with mock data)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at `http://localhost:5173` with mock search data.

### Production Integration

See [INTEGRATION.md](./INTEGRATION.md) for complete backend setup instructions.

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── SearchBar.tsx
│   │   ├── ResultCard.tsx
│   │   ├── EmptyState.tsx
│   │   └── LoadingState.tsx
│   ├── lib/
│   │   ├── api.ts          # API integration layer
│   │   ├── types.ts        # TypeScript definitions
│   │   └── utils.ts
│   ├── App.tsx             # Main application
│   └── index.css           # Styles and theme
├── INTEGRATION.md          # Backend integration guide
├── PRD.md                  # Product requirements
└── .env.example            # Environment template
```

## Configuration

1. Copy `.env.example` to `.env`
2. Update the environment variables:
   - `VITE_BEDROCK_API_URL` - Your backend API endpoint
   - `VITE_BEDROCK_KB_ID` - AWS Bedrock Knowledge Base ID
   - `VITE_AWS_REGION` - AWS region

## Technology Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui v4
- **Icons:** Phosphor Icons
- **Animations:** Framer Motion
- **Build Tool:** Vite

## API Integration

The application expects a backend API with a POST `/search` endpoint:

```typescript
POST /search
Content-Type: application/json

{
  "query": "your search query",
  "knowledgeBaseId": "your-kb-id"
}
```

Response format:

```typescript
{
  "results": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "content": "Article content preview...",
      "source": "Publication Name",
      "publishedDate": "2024-01-15T10:30:00Z",
      "relevanceScore": 0.95,
      "metadata": {
        "author": "Author Name",
        "category": "Category",
        "tags": ["tag1", "tag2"]
      }
    }
  ],
  "totalCount": 42,
  "query": "your search query"
}
```

## Design System

The application uses a carefully crafted design system:

- **Colors:** Deep teal primary, warm coral accents
- **Typography:** Inter for UI, Newsreader for editorial content
- **Spacing:** Consistent 8px grid system
- **Animations:** Purposeful motion for feedback and delight

See [PRD.md](./PRD.md) for complete design specifications.

## Backend Examples

### Python + FastAPI

See `INTEGRATION.md` for a complete FastAPI implementation example that connects to AWS Bedrock.

### Node.js + Express

```javascript
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

const bedrockAgentRuntime = new AWS.BedrockAgentRuntime({
  region: process.env.AWS_REGION
});

app.post('/search', async (req, res) => {
  try {
    const { query, knowledgeBaseId } = req.body;
    
    const response = await bedrockAgentRuntime.retrieve({
      knowledgeBaseId,
      retrievalQuery: { text: query }
    }).promise();
    
    // Transform and return results
    res.json(transformResults(response));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8000);
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT

## Support

For questions about:
- **Frontend/UI:** Check component files and PRD.md
- **Backend Integration:** See INTEGRATION.md
- **AWS Bedrock:** Consult AWS documentation
