# Gem Craft - Jewelry Design Platform

Gem Craft is a Next.js application that allows users to design custom jewelry by selecting and arranging beads, pendants, drops, and links on different metal chains.

## Features

- **Interactive Design Board**: Drag and drop interface for placing jewelry components on chains
- **Component Library**: Browse and select from various beads, pendants, drops, and links
- **Metal Customization**: Choose from different metal colors (Gold, Antique Gold, Silver, Antique Silver, Gold Matte)
- **Design Management**: Save, edit, and share custom jewelry designs
- **Screenshot Functionality**: Capture your designs for sharing or reference
- **Inventory Management**: Add, edit, and categorize jewelry components
- **User Authentication**: Secure user accounts with Clerk authentication

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form with Zod validation
- **Image Uploads**: Cloudinary integration
- **UI Components**: Radix UI primitives

## Getting Started

First, set up your environment variables:

```
POSTGRES_PRISMA_URL=your_postgres_connection_string
POSTGRES_URL_NON_POOLING=your_postgres_direct_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks for data fetching and state management
- `/lib`: Utility functions and configuration
- `/prisma`: Database schema and migrations

## Key Pages

- **Design Board** (`/design-board`): Main jewelry design interface
- **Inventory Management** (`/category-data`): Manage jewelry components and categories

## Database Schema

The application uses the following main data models:

- **Item**: Represents jewelry components (beads, pendants, drops, links)
- **Category**: Groups items by type
- **Jewelry**: Represents a user's custom jewelry design
- **JewelryPosition**: Tracks the placement of items in a jewelry design
- **JewelryDesign**: Stores design templates

## Deployment

The application is configured for deployment on Vercel with specific caching strategies for optimal performance.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
