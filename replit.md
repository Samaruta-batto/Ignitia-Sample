# FestConnect - Event Management Platform

## Overview

FestConnect (branded as "Ignitia") is a comprehensive event management platform built with Next.js 15. The application provides a complete ecosystem for festival and event management, including event discovery, digital payments, merchandise sales, AI-powered support, and sponsor management. The platform targets event organizers and attendees, offering both user-facing features and administrative capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 (App Router) with React 18 and TypeScript
- Server-side rendering (SSR) and static site generation (SSG) for optimal performance
- Turbopack for faster development builds
- Client-side routing with automatic code splitting

**UI Component Library**: Shadcn/ui with Radix UI primitives
- Fully accessible components built on Radix UI
- Customizable with Tailwind CSS and CSS variables
- Dark mode support by default
- Custom theme based on purple/gold color scheme (#312A41, #1A1625, #D4AF37)

**Styling**: Tailwind CSS with custom design tokens
- Mobile-first responsive design
- Custom fonts: Oswald (headlines), Roboto (body text)
- Animation library: Framer Motion for smooth transitions
- Custom cursor implementation for enhanced UX

**State Management**: React hooks and context
- Client-side state managed through React hooks (useState, useEffect)
- Authentication state managed via Supabase auth context
- Form handling with React Hook Form

### Backend Architecture

**Framework**: Next.js API Routes and Server Actions
- Server actions for form submissions and data mutations
- API routes for external integrations
- Middleware for authentication and route protection

**AI Integration**: Google Genkit for AI-powered features
- Chatbot flows for FAQ answering and support escalation
- Integrated with Google Gemini 2.5 Flash model
- Separate development server for AI testing (`genkit:dev`, `genkit:watch`)

**Content Management**: Static data with JSON placeholder system
- Event data, merchandise, sponsors stored in typed TypeScript files
- Placeholder images with descriptive metadata
- Type-safe data structures using TypeScript interfaces

### Authentication & Authorization

**Provider**: Supabase Auth (optional)
- Email/password authentication
- Session management via cookies
- Middleware-based route protection for admin routes
- Graceful fallback when Supabase credentials not configured
- Separate login flows for users (`/user-login`) and admins (`/login`)

**Access Control**:
- Public routes: Home, events, merchandise, gallery
- Protected routes: User dashboard, wallet management
- Admin routes: Analytics, user management, audit logs

### Data Architecture

**Data Storage**: Currently static/client-side (designed for future database integration)
- TypeScript interfaces define data models (Event, Product, Sponsor, ArchiveItem)
- Placeholder data system with image metadata
- Ready for Supabase/Postgres integration (referenced but not actively used)

**Data Models**:
- Events: Categories, subcategories, prizes, locations, dates
- Products: Merchandise with pricing and images
- Sponsors: Tiered sponsorship with branding
- Archive: Historical content with year/topic filtering
- Users: Authentication and profile management

### Routing Structure

**App Router Layout**:
- `(app)` route group: Main application with shared layout and navigation
- `/admin`: Administrative dashboard with separate sidebar layout
- Authentication pages: `/login`, `/signup`, `/user-login`
- Feature pages: `/home`, `/events`, `/dashboard`, `/archive`, `/sponsors`, `/teams`

**Middleware**: Route protection and session management
- Checks for valid Supabase credentials
- Redirects unauthenticated users from admin routes
- Manages auth cookies and session refresh

## External Dependencies

### Third-Party Services

**Supabase** (Optional Authentication & Database)
- Purpose: User authentication and future data persistence
- Integration: SSR-compatible client via `@supabase/ssr`
- Status: Configured for optional use; app functions without credentials
- Configuration: Environment variables for URL and anon key

**Google AI (Gemini)** via Genkit
- Purpose: AI-powered chatbot for user support
- Model: Gemini 2.5 Flash
- Flows: FAQ answering, issue escalation
- Development: Separate Genkit dev server for testing

**Image Hosting**
- Unsplash: Event and content imagery
- Google Cloud Storage: Custom uploaded content
- Placeholder.co: Fallback images

### UI & Component Libraries

**Radix UI Primitives**
- Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Full keyboard navigation support
- ARIA compliance

**Lucide React**
- Icon library for consistent iconography
- Thin stroke weight aligned with design system

**Embla Carousel**
- Touch-enabled carousel for image galleries
- Responsive and performant

**Recharts**
- Data visualization for admin analytics
- Line charts, bar charts for metrics

### Development & Build Tools

**TypeScript**: Type safety across the codebase
- Strict mode enabled
- Path aliases for clean imports (@/components, @/lib, etc.)

**Patch Package**: Post-install patches for dependencies
- Maintains custom modifications to third-party packages

**Environment Management**: dotenv for configuration
- Separate development and production environments
- Graceful handling of missing credentials

### Form & Validation

**React Hook Form**: Form state management
- Efficient re-renders with uncontrolled components
- Integration with Zod for schema validation

**@hookform/resolvers**: Validation resolver for React Hook Form
- Type-safe form validation

### Animation & Interaction

**Framer Motion**: Animation library
- Page transitions, hover effects
- Smooth scroll animations
- Custom cursor tracking

**Date-fns**: Date manipulation and formatting
- Event date handling
- Archive filtering by year

### Typography & Fonts

**Google Fonts**
- Oswald: Display/headline font
- Roboto: Body text font
- Loaded via Next.js font optimization