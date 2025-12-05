# TV 2 Arkivsøgning


A UX prototype for TV 2 journalists to search and analyze previous news coverage. Built with fictional Danish news data to demonstrate real-world workflows for finding previous coverage, avoiding duplicate work, and identifying new story angles.

**Experience Qualities**:
1. **Clear** - The interface should immediately communicate its purpose and value to journalists without technical jargon
2. **Focused** - Clean, distraction-free design that keeps attention on the search experience and discovered content
3. **Professional** - Conveys trust and authority appropriate for a news organization's internal tool

**Complexity Level**: Light Application (multiple features with basic state)
This is a search-focused tool with form input, results display, article detail view, AI insights panel, and state management. Features semantic search simulation, LLM-powered insight generation, and drawer-based article viewing.

## Essential Features

### Semantic Search Query
- **Functionality**: Text input field that accepts natural language queries for semantic search
- **Purpose**: Allow users to search news content using conversational queries rather than rigid keywords
- **Trigger**: User types query and presses Enter or clicks search button
- **Progression**: Focus input → Type query → Submit → Loading state → Results appear → Can refine search
- **Success criteria**: Query is sent to backend, loading state is clear, results populate within reasonable time

### Results Display
- **Functionality**: Card-based list showing search results with relevance scores, metadata, and content previews
- **Purpose**: Present discovered content in scannable, actionable format with context
- **Trigger**: Successful search response from backend
- **Progression**: Results load → Cards render with staggered animation → User can scroll and review → Click card for details
- **Success criteria**: All result fields display correctly, relevance scores are visible, content is readable

### Empty States
- **Functionality**: Contextual example search scenarios displayed in header before first search; helpful messaging when searches yield no results
- **Purpose**: Guide users on how to use the tool with diverse, realistic journalism scenarios; provide feedback when searches yield nothing
- **Trigger**: Initial page load (shows example scenarios) or zero-result search response (shows no results message)
- **Progression**: User sees example scenarios → Clicks or types own search → Scenarios hide after first search
- **Success criteria**: Clear, helpful scenarios that demonstrate tool capabilities; inspiring examples that cover different journalism workflows

### Article Detail Drawer
- **Functionality**: Side drawer showing complete article with metadata, extracted sources, and full text
- **Purpose**: Allow journalists to review full article context without leaving search results
- **Trigger**: Click on any result card
- **Progression**: Click card → Drawer slides in → View full text → See sources → Close drawer → Return to results
- **Success criteria**: Smooth transitions, readable text formatting, easy to dismiss

### AI Insights Panel
- **Functionality**: AI-generated journalism insights including previous angles, blind spots, source suggestions, and timeline
- **Purpose**: Help journalists understand coverage history and discover new story angles
- **Trigger**: Successful search with results
- **Progression**: Search completes → AI analyzes results → Insights appear in side panel → Journalist reviews recommendations
- **Success criteria**: Relevant insights, clear categorization, actionable suggestions

### Semantic Search System
- **Functionality**: Simulated semantic search across 25 fictional Danish articles using relevance scoring
- **Purpose**: Demonstrate semantic search UX without requiring backend infrastructure
- **Trigger**: User submits query
- **Progression**: Query submitted → Relevance calculated → Articles ranked → Top results returned with scores
- **Success criteria**: Relevant results, appropriate relevance scores, fast response time

### Help Documentation
- **Functionality**: Interactive help dialog explaining the tool's purpose, use cases, and search tips
- **Purpose**: Onboard journalists quickly and clarify the tool's value without requiring external documentation
- **Trigger**: Click "Hjælp" button in header
- **Progression**: Click help button → Dialog opens → Read sections (What it does, When to use, Search tips) → Close dialog → Return to search
- **Success criteria**: Clear explanations, practical examples, easy to scan and understand

## Edge Case Handling

- **Network Failures**: Display friendly error message with retry option, maintain search query in input
- **Slow Responses**: Show loading indicator after 300ms, timeout message after 30s
- **Empty Query**: Prevent submission, show subtle validation hint
- **Very Long Queries**: Accept up to 500 characters, truncate display in result cards if needed
- **Malformed API Response**: Gracefully handle with error boundary and actionable message
- **No Results**: Show encouraging empty state suggesting query refinement

## Design Direction

The design should evoke trust, intelligence, and clarity. This is a professional tool for news professionals, so it should feel sophisticated but not corporate-boring. Think research interface meets modern search engine - clean, spacious, with subtle indicators of AI capability. The aesthetic should suggest precision and insight.

## Color Selection

A refined TV 2-inspired palette using the official TV 2 brand colors - rich red and deep blue - conveying both authority and energy appropriate for a professional news organization.

- **Primary Color**: TV 2 Red (oklch(0.44 0.23 25)) - Official TV 2 brand red representing trust, journalistic authority, and energy. Used for primary actions, focus states, and key interactive elements.
- **Secondary Color**: TV 2 Blue (oklch(0.38 0.15 260)) - Professional deep blue representing depth, credibility, and analytical capability. Used for secondary actions and supporting elements.
- **Accent Color**: Bright Coral-Red (oklch(0.62 0.26 28)) - Energetic accent for hover states, highlights, and attention-grabbing elements like relevance indicators.
- **Neutral Colors**: 
  - Soft grey-white backgrounds (oklch(0.98 0.002 280)) for clean, distraction-free content display
  - Subtle muted backgrounds (oklch(0.96 0.005 280)) for container differentiation
- **Foreground/Background Pairings**:
  - Background (Soft White oklch(0.98 0.002 280)): Dark text (oklch(0.18 0.01 280)) - Ratio 16.5:1 ✓
  - Primary Red (oklch(0.44 0.23 25)): White text (oklch(0.99 0 0)) - Ratio 8.1:1 ✓
  - Accent Coral-Red (oklch(0.62 0.26 28)): White text (oklch(0.99 0 0)) - Ratio 5.2:1 ✓
  - Secondary Blue (oklch(0.38 0.15 260)): White text (oklch(0.99 0 0)) - Ratio 9.8:1 ✓

## Font Selection

Typography should convey both editorial authority and modern interface clarity, balancing readability with personality.

- **Primary Typeface**: Inter Variable for UI elements and body text - provides excellent readability at all sizes with a neutral, professional character
- **Display Typeface**: Newsreader for result titles and key headings - brings editorial sophistication and gravitas to content presentation

**Typographic Hierarchy**:
- H1 (Main Title): Newsreader Bold/32px/tight letter spacing/-0.02em
- H2 (Result Titles): Newsreader Semibold/20px/normal/line-height 1.3
- Body (Search input, metadata): Inter Regular/16px/normal/line-height 1.5
- Small (Timestamps, scores): Inter Medium/13px/wide letter spacing/0.01em
- Labels: Inter Semibold/14px/normal/uppercase/letter-spacing 0.05em

## Animations

Animations should reinforce the sense of intelligent processing and smooth discovery. Use subtle motion to guide attention and communicate system status without feeling gimmicky.

- Search button scales slightly on hover (1.02x) with smooth spring physics
- Results stagger-fade in from bottom (50ms delay between cards) to suggest progressive discovery
- Loading state uses a subtle pulse animation on search field border to show active processing
- Empty state icon has a gentle float animation to add life without distraction
- Relevance score badges have a subtle glow effect that pulses once on initial render

## Component Selection

**Components**:
- **Input** (shadcn): Search field with custom styling for prominent display, increased padding
- **Button** (shadcn): Search submit button with custom coral accent treatment
- **Card** (shadcn): Result containers with hover elevation and border customization
- **Badge** (shadcn): Relevance score indicators with custom colors
- **Alert** (shadcn): Error state messaging with warning variant
- **Skeleton** (shadcn): Loading state placeholders matching result card structure
- **ScrollArea** (shadcn): Results list container for smooth scrolling

**Customizations**:
- Custom animated logo icon using Phosphor icons (MagnifyingGlass with pulsing animation)
- Example scenario cards with emoji icons, titles, descriptions, and clickable queries
- Gradient background pattern using layered radial gradients in red/blue TV2 colors
- Custom relevance score visualization with percentage badges
- Scenarios displayed prominently in header, disappearing after first search for cleaner results view

**States**:
- **Search Button**: Default (red gradient), hover (darker red + scale + shadow), active (pressed scale), disabled (muted), loading (rotating sparkle icon)
- **Search Input**: Default (subtle border), focus (red ring + border glow), filled (maintains content), disabled (muted)
- **Result Cards**: Default (flat with subtle border), hover (elevated shadow + red border highlight + translate up), clicked (brief scale animation), loading (skeleton with pulse)
- **Example Scenario Cards**: Default (white card with border), hover (red border + shadow + translate up), active (scale down)
- **Badge**: High relevance (red), medium relevance (blue), low relevance (muted)

**Icon Selection**:
- MagnifyingGlass for search action
- SpinnerGap for loading state (animated)
- Warning for error states
- Article for result card icons
- Calendar for date metadata
- ChartBar for relevance scores

**Spacing**:
- Container: px-6 md:px-12 (comfortable horizontal breathing room)
- Section gaps: space-y-8 for major sections, space-y-4 for related groups
- Card internal: p-6 (generous padding for readability)
- Card grid gap: gap-4 (clear separation without excessive space)
- Input padding: px-6 py-4 (makes search field feel substantial)

**Mobile**:
- Single column layout throughout (no grid on mobile)
- Search container remains fixed at top with backdrop blur on scroll
- Cards stack with full width and slightly reduced padding (p-4)
- Font sizes scale down: H1 to 24px, H2 to 18px, body to 15px
- Touch targets minimum 44px height for all interactive elements
- Bottom sheet pattern for potential result detail view
