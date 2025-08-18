# Stellar Explorer

![App Preview](https://imgix.cosmicjs.com/bde429f0-7c75-11f0-8dcc-651091f6a7c0-photo-1502134249126-9f3755a50d78-1755550553137.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive educational platform for exploring stars, galaxies, and constellations. Built with Next.js 15 and powered by Cosmic CMS, this application provides an immersive learning experience about our universe.

## Features

- 🌟 **Interactive Star Catalog** - Explore detailed information about famous stars including Betelgeuse and Sirius
- 🌌 **Galaxy Explorer** - Discover galaxies like Andromeda and the Whirlpool Galaxy with scientific data
- ⭐ **Constellation Guide** - Learn about constellations including their mythology, viewing seasons, and notable stars
- 🔍 **Advanced Filtering** - Filter content by type, viewing season, hemisphere, and spectral class
- 📱 **Responsive Design** - Optimized for all devices with beautiful astronomical imagery
- 🎨 **Modern UI** - Clean, space-themed design with smooth animations and intuitive navigation

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68a392e9285201cee6cfb709&clone_repository=68a3940493b14acea3074f16)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a website for learning about stars, galaxies, constellations, and more

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd stellar-explorer
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials to `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching All Objects by Type
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all stars
const stars = await cosmic.objects
  .find({ type: 'stars' })
  .depth(1)
  .props(['id', 'title', 'slug', 'metadata'])

// Get all constellations
const constellations = await cosmic.objects
  .find({ type: 'constellations' })
  .depth(1)
```

### Fetching Single Objects
```typescript
// Get specific star by slug
const star = await cosmic.objects
  .findOne({ type: 'stars', slug: 'betelgeuse' })
  .depth(1)
```

### Filtering Content
```typescript
// Get constellations by hemisphere
const northernConstellations = await cosmic.objects
  .find({
    type: 'constellations',
    'metadata.hemisphere': 'northern'
  })
  .depth(1)
```

## Cosmic CMS Integration

This application uses your existing Cosmic content model:

- **Stars** - Contains star information with constellation relationships
- **Constellations** - Features constellation data with mythology and viewing information  
- **Galaxies** - Includes galaxy details with scientific classifications

The application leverages:
- Object metafields for rich content (HTML descriptions, images, scientific data)
- Select-dropdown fields for classifications (spectral class, galaxy type, hemisphere)
- Object relationships between stars and constellations
- File metafields for astronomical imagery

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the application: `bun build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

Make sure to add your Cosmic credentials as environment variables in your deployment platform.

<!-- README_END -->