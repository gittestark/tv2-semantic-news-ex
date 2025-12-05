# TV2 Semantic News Explorer

A semantic search interface for exploring news content using AI-powered knowledge base queries, designed to connect with AWS Bedrock Knowledge Bases for intelligent content discovery.

**Experience Qualities**:
1. **Intelligent** - The interface should feel smart and responsive, surfacing relevant results through semantic understanding rather than simple keyword matching
2. **Focused** - Clean, distraction-free design that keeps attention on the search experience and discovered content
3. **Professional** - Conveys trust and authority appropriate for a news organization's internal tool

**Complexity Level**: Light Application (multiple features with basic state)
This is a search-focused tool with form input, results display, and state management. It requires API integration patterns and clear feedback states but doesn't need complex routing or multi-view architecture.

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
- **Functionality**: Contextual messaging when no search has been performed or no results found
- **Purpose**: Guide users on how to use the tool and provide feedback when searches yield nothing
- **Trigger**: Initial page load or zero-result search response
- **Progression**: User sees empty state → Reads guidance → Performs search
- **Success criteria**: Clear, helpful messaging that doesn't feel like an error

### API Integration Layer
- **Functionality**: Configurable connection point for AWS Bedrock Knowledge Base API
- **Purpose**: Enable easy backend integration without modifying core UI logic
- **Trigger**: Search submission
- **Progression**: UI calls API service → Service formats request → Sends to backend → Processes response → Returns to UI
- **Success criteria**: Clear separation of concerns, documented integration points, easy credential configuration

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

A sophisticated palette centered on deep teals and warm accents, conveying both technological capability and editorial warmth.

- **Primary Color**: Deep Teal (oklch(0.45 0.12 210)) - Represents intelligence, trust, and technological sophistication. Used for primary actions and key interactive elements.
- **Secondary Colors**: 
  - Slate backgrounds (oklch(0.96 0.01 240)) for subtle container differentiation
  - Deep navy (oklch(0.25 0.04 250)) for text and headers, providing excellent readability
- **Accent Color**: Warm Coral (oklch(0.70 0.15 35)) - Attention-grabbing highlight for search button, relevance indicators, and interactive states. Provides energetic contrast to the cool primary.
- **Foreground/Background Pairings**:
  - Background (Soft White oklch(0.98 0 0)): Deep navy text (oklch(0.25 0.04 250)) - Ratio 12.1:1 ✓
  - Primary Teal (oklch(0.45 0.12 210)): White text (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Accent Coral (oklch(0.70 0.15 35)): Deep navy text (oklch(0.25 0.04 250)) - Ratio 5.2:1 ✓
  - Card backgrounds (Slate oklch(0.96 0.01 240)): Deep navy text (oklch(0.25 0.04 250)) - Ratio 11.8:1 ✓

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
- Custom search icon animation using Phosphor icons (MagnifyingGlass)
- Custom empty state illustration area using geometric shapes
- Gradient background pattern using layered radial gradients in subtle teal/coral
- Custom relevance score visualization (could be progress bar or numeric badge)

**States**:
- **Search Button**: Default (coral), hover (darker coral + scale), active (pressed scale), disabled (muted)
- **Search Input**: Default (subtle border), focus (teal ring + border), filled (maintains focus style), error (red ring)
- **Result Cards**: Default (flat), hover (elevated shadow + border highlight), loading (skeleton with pulse)
- **Badge**: High relevance (coral), medium relevance (teal), low relevance (muted)

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
