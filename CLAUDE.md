# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Philly Lit Map is a Next.js application that displays literary quotes from books on an interactive map of Philadelphia. Users can view quotes tied to geographic locations, browse books, and manage their literary collection.

## Development Commands

**Development:**
```bash
pnpm dev          # Start dev server (runs prisma generate first)
pnpm build        # Build for production (generates Prisma client and pushes DB schema)
```

**Code Quality:**
```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format code with Prettier
pnpm format:check # Check formatting without writing
```

**Database:**
```bash
npx prisma generate           # Generate Prisma client
npx prisma db push           # Push schema changes to database
npx prisma migrate dev       # Create and apply migrations
npx prisma studio            # Open Prisma Studio GUI
```

## Architecture

### Database & ORM

**Prisma with PostgreSQL**
- Schema: `prisma/schema.prisma`
- Database URLs: `DATABASE_URL_PRISMA` (connection pooling) and `POSTGRES_URL` (direct connection)
- Singleton pattern in `lib/prisma.ts` prevents multiple instances in development
- Key models: `Book`, `Quote`, `User`, `Session`, `Account`, `Verification`

**Data Relationships:**
- Books have many Quotes (one-to-many)
- Users own Books and Quotes (one-to-many)
- Quotes are tied to Books via `bookId` foreign key
- Quotes have optional `latitude`/`longitude` for map placement

### Authentication

**Better Auth** (not NextAuth)
- Server config: `lib/auth.ts` - uses Prisma adapter with email/password auth
- Client config: `lib/auth-client.ts`
- API route: `app/api/auth/[...all]/route.ts`
- Models: `User`, `Session`, `Account`, `Verification` follow Better Auth schema

### App Structure

**Next.js 13 App Router:**
- Public routes: `/` (map), `/books`, `/quotes`, `/about`
- Protected routes: `/dashboard`, `/quotes/add`, `/books/add`, edit pages
- Route groups: `(pages)` for pages with special layout
- Server Components by default; client components marked with `'use client'`

**Server Actions:**
- Pattern: `actions.ts` files colocated with pages
- Handle form submissions and data mutations
- Call `revalidatePath()` after mutations
- Redirect after successful operations

**Key Components:**
- `home-map-with-sidebar.tsx`: Main map view with Leaflet, shows quotes with locations
- Map uses react-leaflet with clustering (MarkerClusterGroup)
- Sidebar filters books/quotes based on visible map bounds
- Forms use native FormData (no Zod validation yet, despite prompt guidelines)

### Styling

- Tailwind CSS for all styling
- Mobile-first responsive design
- Dark mode not implemented (prompt suggests it but codebase uses light mode)

### Data Flow

1. **Homepage (`app/page.tsx`)**: Fetches all quotes with book relations, passes to map component
2. **Map Component**: Client-side Leaflet map with markers for quotes with coordinates
3. **Sidebar**: Dynamically filters books/quotes based on map viewport bounds
4. **Forms**: Server Actions handle submissions, revalidate paths, redirect

## Important Notes

- **Hardcoded userId**: Current actions use `userId: '1'` (see `app/(pages)/quotes/add/actions.ts:22`) - needs proper auth integration
- **Leaflet CDN Icons**: Map uses unpkg.com for marker icons since Leaflet requires special handling with SSR
- **Dynamic rendering**: Homepage uses `export const dynamic = 'force-dynamic'` to avoid static optimization for real-time data
- **Better Auth MCP**: Better Auth documentation is available via MCP server for questions about authentication

@prompts/nextjs-best-practice.prompt.md
@prompts/git-commit-conventions.prompt.md
