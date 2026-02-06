# Video Advisory Platform - Project Context

## Overview

This is a **video advisory platform** that connects **Users** with domain **Experts** and **Analysts** to provide personalized, curated video recommendations across multiple streaming platforms. Users pay a monthly subscription to receive tailored video content guidance based on their interests, learning goals, and platform access.

**Key Differentiator**: Videos exist across multiple platforms (YouTube, Netflix, Coursera, etc.), and users have different platform subscriptions. Experts can recommend specific videos while considering which platforms the user can actually access, ensuring recommendations are actionable.

## Stakeholders

### 1. Users (Subscribers)
- **Role**: Consumers of expert video recommendations
- **Actions**:
  - Complete surveys and questionnaires to build their profile
  - Specify which video platforms they subscribe to
  - Submit requests for curated video recommendations
  - Receive personalized video lists from experts
  - Use AI tools to formulate better questions
- **Subscription**: $29.99/month for access
- **Platform Access**: Each user has a list of platform subscriptions (e.g., YouTube Premium, Netflix, Coursera)

### 2. Experts
- **Role**: Domain specialists who fulfill video recommendation requests
- **Actions**:
  - View user profiles, preferences, platform subscriptions, and request history
  - Accept and fulfill video recommendation requests
  - Consider user's platform access when making recommendations
  - Build and maintain video knowledge bases
  - Collaborate with other experts on complex requests
  - Use research tools to find patterns in user data
  - Work with analyst-provided video content and insights
- **Note**: Experts can also serve as Analysts

### 3. Analysts
- **Role**: Video curators and researchers who feed the expert pipeline
- **Actions**:
  - Catalog videos from across multiple platforms
  - Add video sources (URLs) for each platform where a video is available
  - Document platform-specific differences (quality, subtitles, pricing)
  - Tag, categorize, and annotate video content
  - Comment on video relevance and quality
  - Build video libraries for expert use
  - Receive feedback from experts on content needs
  - Use AI tools to identify research priorities
- **Note**: Not all analysts are experts, but experts can be analysts

## Core Concepts

### Multi-Platform Video Sources
A single video (e.g., a documentary about AI) may be available on multiple platforms:
- Free on YouTube with ads
- Available on Netflix with subscription
- Purchasable on Amazon Prime Video
- Available on Curiosity Stream

Each **VideoSource** tracks:
- Platform-specific URL
- Availability status
- Quality options (SD, HD, 4K)
- Subtitle availability
- Access requirements (subscription tier, purchase price, etc.)
- Analyst notes about platform-specific differences

### Platform Access Requirements
Platforms have complex access models:
- **Free tiers** (YouTube Free - with ads)
- **Premium subscriptions** (YouTube Premium, Netflix)
- **Per-video purchases** (iTunes, Amazon)
- **Rentals** (temporary access)
- **Creator subscriptions** (YouTube channel memberships, Patreon-linked content)
- **Course enrollment** (Coursera, Udemy - may require course purchase)
- **Regional restrictions** (content availability varies by country)

### Platform API Integration
Some platforms have APIs that can be integrated:
- YouTube Data API for metadata
- Vimeo API for video info
- Coursera/edX APIs for course data

## Core Workflows

### User Request Flow
```
User completes profile surveys
       ↓
User specifies platform subscriptions
       ↓
User submits request (e.g., "10 videos about machine learning for beginners")
       ↓
Request enters queue → Expert claims request
       ↓
Expert reviews user profile, preferences, AND platform access
       ↓
Expert researches using knowledge base + analyst video catalog
       ↓
Expert provides curated video list (prioritizing user's accessible platforms)
       ↓
User receives personalized recommendations they can actually watch
```

### Analyst-Expert Feedback Loop
```
Analysts identify trending topics/videos
       ↓
Videos cataloged with multi-platform sources
       ↓
Platform-specific notes added (quality differences, etc.)
       ↓
Experts use catalog to fulfill requests
       ↓
Experts flag content gaps or platform coverage needs
       ↓
Analysts prioritize research based on feedback
```

### Video Cataloging Flow
```
Analyst discovers quality video content
       ↓
Create Video entry with metadata
       ↓
Add VideoSource for each platform
       ↓
Document access requirements per platform
       ↓
Add PlatformNotes for quality/content differences
       ↓
Tag with topics, difficulty, category
```

## Request Types

- **Video Recommendation**: General "find me good videos about X"
- **Learning Path**: Sequential video series for learning a topic
- **Topic Research**: In-depth content on a specific subject
- **Comparison**: Compare different videos/courses on the same topic
- **Custom**: Any other video-related request

## Video Categories

- Tutorial
- Lecture
- Documentary
- Course
- Talk (conference talks, TED talks)
- Workshop
- Review
- Entertainment
- Other

## Features

### Expert Dashboard
- **User Profile View**: At-a-glance view of user preferences, history, **platform subscriptions**
- **Platform Access Indicator**: See which platforms user can access
- **Research Tools**: Search across video catalogs, past requests, analyst content
- **Knowledge Base**: Build and organize reusable video collections
- **Collaboration**: Work with other experts on complex requests
- **Analytics**: Patterns in user needs and request types

### Analyst System
- **Video Cataloging**: Add videos with multi-platform source URLs
- **Platform Source Management**: Track video availability across platforms
- **Quality Documentation**: Note platform-specific differences
- **Tagging System**: Categorize videos with hierarchical tags
- **Annotations**: Add context, notes, and relevance scores
- **Expert Feedback**: View and respond to expert content requests
- **Priority Queue**: AI-suggested research priorities

### Platform Management
- **Platform Registry**: List of supported video platforms
- **API Integration Status**: Which platforms have API connections
- **Tier Documentation**: Platform pricing tiers and features
- **User Platform Matching**: Show experts which videos users can access

### AI Tooling
- **For Users**: Question refinement, criteria suggestion, interest discovery
- **For Experts**: Pattern analysis, video matching, response drafting
- **For Analysts**: Research prioritization, auto-tagging, trend detection

## Technical Architecture

### Tech Stack
- **Frontend**: Next.js 15+ with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + hooks (expandable to Zustand/Redux)
- **Real-time**: Planned - WebSocket or Server-Sent Events
- **Database**: Planned - PostgreSQL or MongoDB
- **Auth**: Planned - NextAuth.js or Auth0
- **AI Integration**: Planned - OpenAI/Anthropic API
- **Platform APIs**: YouTube Data API, Vimeo API, etc. (planned)

### Data Models

#### Core Entities
- `User` - Platform users with roles (user/expert/analyst) and **platformSubscriptions**
- `UserProfile` - Extended user data, preferences, survey responses
- `Survey` / `Question` - User questionnaires
- `Request` - User requests for video recommendations
- `RequestResponse` - Expert responses with curated video lists

#### Video System
- `Platform` - Video streaming platforms (YouTube, Netflix, etc.)
  - Includes pricing tiers, API capabilities, subscription types
- `Video` - Core video content with metadata
- `VideoSource` - Platform-specific availability for a video
  - URL, quality, subtitles, access requirements
- `VideoAccessRequirement` - Access type (free, subscription, purchase, etc.)
- `PlatformNote` - Analyst observations about platform-specific differences
- `VideoRating` - Expert ratings and comments on videos
- `VideoCreator` - Video author/channel information

#### Knowledge System
- `KnowledgeBase` - Expert-curated video collections
- `KnowledgeEntry` - Individual items in a knowledge base
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
│   │   └── content/         # Video cataloging
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
│   ├── data.ts              # Mock data store (platforms, videos, users)
│   ├── ai.ts                # AI service integrations
│   ├── notifications.ts     # Notification service
│   └── utils.ts             # Helper utilities
├── types/                   # TypeScript definitions
├── hooks/                   # Custom React hooks
├── contexts/                # React Context providers
├── __tests__/               # Test files
└── docs/                    # Additional documentation
```

## Key Helper Functions

### Platform Functions
- `getAllPlatforms()` - Get all registered platforms
- `getPlatformById(id)` - Get platform by ID
- `getPlatformsByType(type)` - Get platforms by type (subscription, freemium, etc.)
- `getUserPlatforms(userId)` - Get platforms a user subscribes to

### Video Functions
- `getAllVideos()` - Get all cataloged videos
- `getVideoById(id)` - Get video by ID
- `getVideosByCategory(category)` - Get videos by category
- `getVideosForUser(userId)` - Get videos accessible to user's platforms
- `getVideoSourcesForUser(videoId, userId)` - Get sources user can access
- `getRecommendedSourceForUser(videoId, userId)` - Best source for user
- `checkVideoAvailabilityForUser(videoId, userId)` - Check if user can watch

## API Design (Planned)

### REST Endpoints
- `GET/POST /api/users` - User management
- `GET/POST /api/requests` - Request CRUD
- `GET/POST /api/knowledge` - Knowledge base operations
- `GET/POST /api/videos` - Video catalog management
- `GET/POST /api/platforms` - Platform registry
- `GET/POST /api/projects` - Collaboration projects
- `GET/POST /api/notifications` - Notification management
- `POST /api/ai/*` - AI tool endpoints

### Platform API Integrations (Planned)
- YouTube Data API - Video metadata, channel info
- Vimeo API - Video info, privacy settings
- Coursera API - Course catalog, pricing
- Educational platform APIs as available

## Testing Strategy

### Unit Tests
- Type validation
- Utility functions
- Platform/video matching logic
- Data transformations
- Component rendering

### Integration Tests
- API endpoint behavior
- Data flow between components
- Authentication flows
- Platform subscription logic

### E2E Tests (Future)
- Complete user workflows
- Expert request fulfillment
- Analyst video cataloging

## Development Priorities

### Phase 1: Foundation (Current)
- [x] Basic user/expert/analyst roles
- [x] Survey system
- [x] Request submission and fulfillment
- [x] Multi-platform video system
- [x] Platform subscription tracking
- [x] Video source management
- [x] Component library

### Phase 2: Platform Integration
- [ ] YouTube Data API integration
- [ ] Vimeo API integration
- [ ] Auto-fetch video metadata
- [ ] Platform availability checking

### Phase 3: Expert Enhancement
- [ ] Enhanced user profile views with platform access
- [ ] Video knowledge base system
- [ ] Platform-aware research tools
- [ ] Pattern analysis

### Phase 4: AI Integration
- [ ] Question refinement for users
- [ ] Video matching for experts
- [ ] Auto-tagging for analysts
- [ ] Platform suggestion engine

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

# Platform APIs
YOUTUBE_API_KEY=...
VIMEO_ACCESS_TOKEN=...
COURSERA_API_KEY=...

# Real-time
WEBSOCKET_URL=...

# Feature Flags
ENABLE_AI_FEATURES=true
ENABLE_REALTIME=true
ENABLE_PLATFORM_APIS=true
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

1. **Video-First Focus**: Platform is specifically designed for video content recommendations
2. **Multi-Platform Architecture**: Videos tracked across multiple streaming platforms
3. **User Platform Awareness**: Recommendations consider user's actual platform access
4. **Complex Access Models**: Support for subscriptions, purchases, creator memberships, etc.
5. **Mock Data First**: Development uses in-memory mock data for rapid iteration
6. **Client Components**: Most pages are client-rendered for interactivity
7. **Type Safety**: Full TypeScript with strict mode
8. **Component Colocation**: Page-specific components live with their pages
9. **Incremental Enhancement**: Features added incrementally with backwards compatibility
