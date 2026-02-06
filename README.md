# Expert Advisory Board Platform

A comprehensive web application that connects users with domain experts and analysts for personalized advice, curated content recommendations, and collaborative knowledge building.

## Overview

This platform enables a three-stakeholder ecosystem:
- **Users**: Subscribers who receive personalized expert guidance
- **Experts**: Domain specialists who curate content and provide advice
- **Analysts**: Content researchers who build and maintain the knowledge pipeline

## Features

### For Users
- Complete interest assessment surveys
- Submit requests for curated content (videos, articles, advice)
- Specify detailed criteria for personalized recommendations
- View expert responses with curated items and reasoning
- Track request status and history
- Receive AI-powered question refinement suggestions

### For Experts
- **Enhanced Dashboard**: At-a-glance user profile views with preferences, history, and survey data
- **Knowledge Base System**: Build and organize reusable content collections
- **Research Tools**: Search across knowledge bases, past requests, and analyst content
- **AI Assistance**: Pattern detection, content matching, and response drafting suggestions
- **Collaboration**: Work with other experts on complex requests through project workspaces
- Track assignments and view analytics

### For Analysts
- **Content Ingestion**: Add and curate content from the web (videos, articles, papers, courses)
- **Tagging System**: Hierarchical tags for content categorization
- **Annotation System**: Add notes, insights, and warnings to content
- **Expert Feedback Loop**: Receive and respond to expert content requests
- **AI Research Priorities**: Get suggestions on what content to research based on demand
- Collaborate on research projects

### Collaboration Tools
- Project workspaces for complex requests
- Kanban-style task boards
- Threaded discussions
- Shared resources
- Real-time notifications

### AI Integration
- Question refinement for users
- Content matching for experts
- Auto-tagging suggestions for analysts
- Research priority recommendations
- Pattern detection across user requests

### Notification System
- Request assignments and completions
- Collaboration invites
- Comment mentions and replies
- Task assignments and due dates
- AI suggestions and insights

## Getting Started

### Prerequisites
- Node.js 20+
- bun 1.0+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AaronBuxbaum/advisor.git
cd advisor
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run typecheck    # Run TypeScript type checking
bun run test         # Run tests
bun run test:watch   # Run tests in watch mode
bun run test:coverage # Run tests with coverage report
```

## Project Structure

```
advisor/
├── app/                      # Next.js App Router pages
│   ├── analyst/             # Analyst dashboard and content management
│   ├── dashboard/           # User dashboard
│   ├── expert/              # Expert dashboard and knowledge base
│   │   └── knowledge/       # Knowledge base management
│   ├── login/               # Authentication
│   ├── notifications/       # Notification center
│   ├── projects/            # Collaboration projects
│   │   └── [id]/           # Project detail view
│   ├── requests/            # Request management
│   ├── signup/              # Registration
│   └── surveys/             # Survey completion
├── components/              # Reusable React components
│   ├── features/           # Feature-specific components
│   │   ├── AISuggestionCard.tsx
│   │   ├── ContentItemCard.tsx
│   │   ├── KnowledgeEntryCard.tsx
│   │   └── UserProfileCard.tsx
│   ├── layouts/            # Layout components
│   │   ├── Header.tsx
│   │   └── PageLayout.tsx
│   └── ui/                 # Base UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Tabs.tsx
├── lib/                    # Utilities and services
│   └── data.ts            # Mock data store and helper functions
├── types/                  # TypeScript type definitions
│   └── index.ts           # All type definitions
├── __tests__/             # Test files
│   ├── components/
│   ├── lib/
│   └── types/
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI/CD
├── CONTEXT.md             # Detailed project context documentation
└── README.md              # This file
```

## Core Data Models

### User Roles
- `user`: Subscribers who request content
- `expert`: Domain specialists who fulfill requests
- `analyst`: Content curators who build the knowledge pipeline
- Note: Users can have multiple roles (e.g., expert + analyst)

### Key Entities
- **Request**: User requests for curated content or advice
- **KnowledgeBase**: Expert-curated content collections
- **ContentItem**: Analyst-ingested content from external sources
- **Project**: Collaboration workspace for complex requests
- **Notification**: Real-time alerts for all stakeholders
- **AISuggestion**: AI-generated recommendations

See `CONTEXT.md` for detailed entity documentation.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | user@example.com | password |
| Expert | expert@example.com | password |
| Analyst | analyst@example.com | password |
| Expert+Analyst | expert.analyst@example.com | password |

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.9
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Testing**: Bun Test + React Testing Library
- **CI/CD**: GitHub Actions

## Testing

The project includes comprehensive tests for:
- Data layer functions (`lib/data.ts`)
- Type definitions
- UI components

Run tests:
```bash
bun test                 # Run all tests
bun test --coverage      # Run with coverage report
```

## CI/CD Pipeline

GitHub Actions workflow includes:
1. **Lint & Type Check**: ESLint and TypeScript validation
2. **Test**: Bun test suite with coverage
3. **Build**: Production build verification

Triggers on:
- Push to `main` or `claude/**` branches
- Pull requests to `main`

## Architecture Decisions

1. **Mock Data First**: Development uses in-memory mock data for rapid iteration
2. **Client Components**: Most pages use client-side rendering for interactivity
3. **Type Safety**: Full TypeScript with strict mode
4. **Component Colocation**: Feature-specific components live with their features
5. **Incremental Enhancement**: Features added incrementally with backwards compatibility

## Future Enhancements

- [ ] Database integration (PostgreSQL/Prisma)
- [ ] Real authentication (NextAuth.js)
- [ ] Payment processing (Stripe)
- [ ] WebSocket real-time updates
- [ ] AI API integration (OpenAI/Anthropic)
- [ ] Email notifications
- [ ] Mobile responsive improvements
- [ ] Advanced analytics dashboard

## Documentation

- `CONTEXT.md`: Comprehensive project context and architecture documentation
- `types/index.ts`: Full type definitions with JSDoc comments
- Component files: Inline documentation

## Contributing

1. Read `CONTEXT.md` for full project context
2. Follow the existing code patterns
3. Add tests for new features
4. Update types for new data models
5. Update documentation as needed

## License

ISC

## Contact

For questions or feedback, please open an issue in the GitHub repository.
