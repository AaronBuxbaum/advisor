# Expert Advisory Board

A web application that connects users with industry experts for personalized advice and curated content recommendations.

## Overview

This platform enables users to receive expert guidance through:
- **Personalized Surveys**: Users complete questionnaires to share their interests and preferences
- **Custom Requests**: Users can request specific content curation (e.g., 10 curated videos on AI)
- **Expert Responses**: Experts review user profiles and provide tailored recommendations
- **Subscription Access**: Monthly subscription model for unlimited expert advice

## Features

### For Users
- Complete interest assessment surveys
- Submit requests for curated content (videos, articles, etc.)
- Specify detailed criteria for personalized recommendations
- View expert responses with curated items
- Track request status (pending, in progress, completed)

### For Experts
- View available user requests
- Access user profiles and survey data
- Accept and respond to requests
- Provide curated recommendations with explanations
- Track completed assignments

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AaronBuxbaum/advisor.git
cd advisor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
advisor/
├── app/                    # Next.js app directory
│   ├── dashboard/         # User dashboard
│   ├── expert/            # Expert dashboard
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── surveys/           # Survey page
│   ├── requests/          # Request pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── lib/                   # Utility functions and data
│   └── data.ts           # Mock data store
├── types/                 # TypeScript type definitions
│   └── index.ts          # Core types
└── components/            # Reusable components (future)
```

## Core Types

### User
- `id`: Unique identifier
- `email`: User email
- `name`: Full name
- `role`: 'user' or 'expert'
- `subscriptionStatus`: 'active', 'inactive', or 'trial'

### Request
- `id`: Unique identifier
- `userId`: Requesting user
- `title`: Request title
- `description`: Detailed description
- `type`: 'video_curation', 'article_curation', 'advice', or 'custom'
- `criteria`: Array of specific criteria
- `status`: 'pending', 'in_progress', 'completed', or 'cancelled'
- `assignedExpertId`: Assigned expert
- `response`: Expert's response with curated items

### Survey
- `id`: Unique identifier
- `userId`: User who completed it
- `title`: Survey title
- `questions`: Array of questions
- `responses`: User's answers

## Usage Examples

### As a User

1. **Sign up** for an account (subscription: $29.99/month)
2. **Complete surveys** to share your interests
3. **Submit a request** for expert curation:
   - Example: "I need 10 curated videos about AI and machine learning for beginners"
   - Add criteria: "AI, Machine Learning, Beginner-friendly, Recent (2025-2026)"
4. **Review expert responses** in your dashboard

### As an Expert

1. **Sign up** as an expert
2. **View available requests** in the expert dashboard
3. **Accept a request** to work on
4. **Provide response** with curated items, including:
   - Content URLs
   - Descriptions
   - Reasoning for each recommendation based on user profile

## Demo Credentials

- **User Account**: user@example.com / password
- **Expert Account**: expert@example.com / password

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Data Storage**: Mock data (ready for database integration)

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- Real authentication system (NextAuth, Auth0)
- Payment processing (Stripe)
- Real-time notifications
- Expert ratings and reviews
- Advanced search and filtering
- Email notifications
- Analytics dashboard
- Mobile app

## Data Flow

1. **User completes survey** → Data stored in user profile
2. **User submits request** → Request created with status 'pending'
3. **Expert views request** → Can see user profile and survey data
4. **Expert accepts request** → Status changes to 'in_progress'
5. **Expert provides response** → Curated items added, status changes to 'completed'
6. **User views response** → Can see all curated items with expert's reasoning

## Contributing

This is a demonstration project. In a production environment, you would want to:

1. Add proper authentication and authorization
2. Implement a real database
3. Add API routes for data operations
4. Implement payment processing
5. Add comprehensive testing
6. Set up CI/CD pipelines
7. Add monitoring and logging

## License

ISC

## Contact

For questions or feedback, please open an issue in the GitHub repository.
