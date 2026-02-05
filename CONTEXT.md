# Expert Advisory Board Platform - Project Context

## Overview

This is an expert advisory board platform that connects **Users** with domain **Experts** and **Analysts** to provide personalized, curated recommendations and advice. Users pay a monthly subscription to access the platform and receive tailored guidance.

## Stakeholders

### 1. Users (Subscribers)
- **Role**: Consumers of expert advice and curated content
- **Actions**:
  - Complete surveys and questionnaires to build their profile
  - Submit requests for curated content (videos, articles, etc.)
  - Receive personalized recommendations from experts
  - Use AI tools to formulate better questions
- **Subscription**: $29.99/month for access

### 2. Experts
- **Role**: Domain specialists who fulfill user requests
- **Actions**:
  - View user profiles, preferences, and request history
  - Accept and fulfill user requests with curated recommendations
  - Build and maintain knowledge bases
  - Collaborate with other experts on complex requests
  - Use research tools to find patterns in user data
  - Work with analyst-provided content and insights
- **Note**: Experts can also serve as Analysts

### 3. Analysts
- **Role**: Content curators and researchers who feed the expert pipeline
- **Actions**:
  - Ingest content from the web and external sources
  - Tag, categorize, and annotate content
  - Comment on content relevance and quality
  - Build content libraries for expert use
  - Receive feedback from experts on content needs
  - Use AI tools to identify research priorities
- **Note**: Not all analysts are experts, but experts can be analysts

## Core Workflows

### User Request Flow
```
User completes profile surveys
       ↓
User submits request (e.g., "10 curated AI videos")
       ↓
Request enters queue → Expert claims request
       ↓
Expert reviews user profile & preferences
       ↓
Expert researches using knowledge base + analyst content
       ↓
Expert provides curated response with reasoning
       ↓
User receives personalized recommendations
```

### Analyst-Expert Feedback Loop
```
Analysts identify trending topics/content
       ↓
Content tagged and added to knowledge base
       ↓
Experts use content to fulfill requests
       ↓
Experts flag content gaps or needs
       ↓
Analysts prioritize research based on feedback
```

### Collaboration Flow
```
Complex request arrives
       ↓
Lead expert creates project/collaboration space
       ↓
Multiple experts/analysts invited
       ↓
Work divided and tracked in shared workspace
       ↓
Unified response assembled and delivered
```

## Features

### Expert Dashboard
- **User Profile View**: At-a-glance view of user preferences, history, survey data
- **Research Tools**: Search across knowledge bases, past requests, analyst content
- **Knowledge Base**: Build and organize reusable content collections
- **Collaboration**: Work with other experts on complex requests
- **Analytics**: Patterns in user needs and request types

### Analyst System
- **Content Ingestion**: Add URLs, documents, media from external sources
- **Tagging System**: Categorize content with hierarchical tags
- **Annotations**: Add context, notes, and relevance scores
- **Expert Feedback**: View and respond to expert content requests
- **Priority Queue**: AI-suggested research priorities

### AI Tooling
- **For Users**: Question refinement, criteria suggestion, interest discovery
- **For Experts**: Pattern analysis, content matching, response drafting
- **For Analysts**: Research prioritization, auto-tagging, trend detection

### Real-time Notifications
- New request assignments
- Collaboration invites
- Expert feedback on content
- Request status updates
- AI suggestions and alerts

### Collaboration Tools
- Shared project workspaces
- Real-time commenting
- Task assignment and tracking
- Version history for responses
- Team chat and discussions

## Technical Architecture

### Tech Stack
- **Frontend**: Next.js 15+ with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + hooks (expandable to Zustand/Redux)
- **Real-time**: Planned - WebSocket or Server-Sent Events
- **Database**: Planned - PostgreSQL or MongoDB
- **Auth**: Planned - NextAuth.js or Auth0
- **AI Integration**: Planned - OpenAI/Anthropic API

### Data Models

#### Core Entities
- `User` - Platform users with roles (user/expert/analyst)
- `UserProfile` - Extended user data, preferences, survey responses
- `Survey` / `Question` - User questionnaires
- `Request` - User requests for expert assistance
- `RequestResponse` - Expert responses with curated items

#### Knowledge System
- `KnowledgeBase` - Expert-curated content collections
- `KnowledgeEntry` - Individual items in a knowledge base
- `ContentItem` - Analyst-ingested content from external sources
- `Tag` - Hierarchical categorization system
- `Annotation` - Comments and notes on content

#### Collaboration
- `Project` - Collaborative workspace for complex requests
- `ProjectMember` - Users assigned to projects with roles
- `Comment` - Threaded discussions on any entity
- `Task` - Work items within projects

#### Notifications
- `Notification` - Real-time alerts for all stakeholder types

#### AI Integration
- `AISuggestion` - AI-generated recommendations
- `AIInteraction` - Logged AI tool usage

## Directory Structure

```
/advisor
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Landing page
│   ├── login/               # Authentication
│   ├── signup/              # Registration
│   ├── dashboard/           # User dashboard
│   ├── expert/              # Expert interface
│   ├── analyst/             # Analyst interface
│   ├── surveys/             # Survey completion
│   ├── requests/            # Request management
│   ├── knowledge/           # Knowledge base
│   ├── projects/            # Collaboration spaces
│   └── api/                 # API routes
├── components/              # Reusable React components
│   ├── ui/                  # Base UI components
│   ├── forms/               # Form components
│   ├── layouts/             # Layout components
│   └── features/            # Feature-specific components
├── lib/                     # Utilities and services
│   ├── data.ts              # Mock data store
│   ├── ai.ts                # AI service integrations
│   ├── notifications.ts     # Notification service
│   └── utils.ts             # Helper utilities
├── types/                   # TypeScript definitions
├── hooks/                   # Custom React hooks
├── contexts/                # React Context providers
├── __tests__/               # Test files
└── docs/                    # Additional documentation
```

## API Design (Planned)

### REST Endpoints
- `GET/POST /api/users` - User management
- `GET/POST /api/requests` - Request CRUD
- `GET/POST /api/knowledge` - Knowledge base operations
- `GET/POST /api/content` - Analyst content management
- `GET/POST /api/projects` - Collaboration projects
- `GET/POST /api/notifications` - Notification management
- `POST /api/ai/*` - AI tool endpoints

### Real-time Events
- `request:created` - New request submitted
- `request:assigned` - Request claimed by expert
- `request:completed` - Request fulfilled
- `content:added` - New analyst content
- `project:updated` - Collaboration activity
- `notification:new` - Push notifications

## Testing Strategy

### Unit Tests
- Type validation
- Utility functions
- Data transformations
- Component rendering

### Integration Tests
- API endpoint behavior
- Data flow between components
- Authentication flows

### E2E Tests (Future)
- Complete user workflows
- Expert request fulfillment
- Analyst content pipelines

## Development Priorities

### Phase 1: Foundation (Current)
- [x] Basic user/expert roles
- [x] Survey system
- [x] Request submission and fulfillment
- [ ] Extended type system
- [ ] Component library

### Phase 2: Analyst System
- [ ] Analyst role and dashboard
- [ ] Content ingestion pipeline
- [ ] Tagging and annotation system
- [ ] Expert-analyst feedback loop

### Phase 3: Expert Enhancement
- [ ] Enhanced user profile views
- [ ] Knowledge base system
- [ ] Research tools
- [ ] Pattern analysis

### Phase 4: AI Integration
- [ ] Question refinement for users
- [ ] Content matching for experts
- [ ] Auto-tagging for analysts
- [ ] Suggestion engine

### Phase 5: Collaboration
- [ ] Project workspaces
- [ ] Real-time commenting
- [ ] Task management
- [ ] Team features

### Phase 6: Real-time & Polish
- [ ] WebSocket notifications
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Production deployment

## Environment Variables (Planned)

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# AI Services
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...

# Real-time
WEBSOCKET_URL=...

# Feature Flags
ENABLE_AI_FEATURES=true
ENABLE_REALTIME=true
```

## Contributing

When adding new features:
1. Update types in `/types/index.ts`
2. Add mock data in `/lib/data.ts`
3. Create components in `/components`
4. Add pages in `/app`
5. Write tests in `/__tests__`
6. Update this document

## Key Design Decisions

1. **Mock Data First**: Development uses in-memory mock data for rapid iteration
2. **Client Components**: Most pages are client-rendered for interactivity
3. **Type Safety**: Full TypeScript with strict mode
4. **Component Colocation**: Page-specific components live with their pages
5. **Incremental Enhancement**: Features added incrementally with backwards compatibility
