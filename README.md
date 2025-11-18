# Podcast Landing Page

A modern, responsive podcast landing page built with Next.js 15 and TypeScript. Features smooth animations, interactive carousels, and a clean design optimized for podcast showcases and audio content.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first CSS
- **Framer Motion** - Smooth scroll animations and transitions
- **Swiper.js** - Touch-enabled carousels
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Modern icon library

## Features

- Full-height hero section with striking typography
- Integrated audio player
- Multiple episode carousels with navigation controls
- Featured podcasts showcase
- Episode category exploration
- Newsletter subscription
- Fully responsive design
- Smooth scroll animations
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/reachvivek/podcast-landing.git
cd podcast-landing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
podcast-landing/
├── public/
│   └── fonts/              # Custom Roboto font files
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles and font configuration
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── LatestEpisodes.tsx
│   │   │   ├── EpisodeCard.tsx
│   │   │   ├── EpisodesCarousel.tsx
│   │   │   ├── FeaturedPodcasts.tsx
│   │   │   └── PodcastExplore.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── data/
│   │   ├── episodes.ts     # Episode data
│   │   └── site-config.ts  # Site configuration
│   ├── types/
│   │   └── podcast.ts      # TypeScript types
│   └── lib/
│       └── utils.ts        # Utility functions
└── package.json
```

## Customization

### Site Configuration

Edit `src/data/site-config.ts` to update site information:

```typescript
export const siteConfig = {
  name: 'Your Podcast Name',
  description: 'Your podcast description',
  phone: '+1 234 567 8900',
  email: 'your@email.com',
  address: 'Your Address',
  hours: 'Mon - Fri: 09:00 - 18:00'
};
```

### Episodes Data

Add or modify episodes in `src/data/episodes.ts`:

```typescript
{
  id: 1,
  title: 'Your Episode Title',
  description: 'Episode description',
  category: 'Category Name',
  episodeNumber: 1,
  duration: '45:00',
  host: 'Host Name',
  imageUrl: '/path/to/image.jpg',
  audioUrl: '/path/to/audio.mp3'
}
```

### Colors

The primary accent color is defined throughout the project. To change it:

1. Update Tailwind configuration in `globals.css`
2. Search and replace `#FF5722` with your preferred color
3. Update `bg-primary`, `text-primary`, and `border-primary` classes

### Typography

Custom Roboto font files are located in `public/fonts/`. Font configuration is in `src/app/globals.css`:

```css
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/Roboto-VariableFont_wdth,wght.ttf') format('truetype-variations');
  font-weight: 100 900;
}
```

## Build for Production

```bash
npm run build
npm start
```

## Author

**Vivek Kumar Singh**
- Email: rogerthatvivek@gmail.com
- Phone: +971-501480042
- GitHub: [@reachvivek](https://github.com/reachvivek)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

Design inspired by modern podcast platforms and audio streaming services. Project setup, structure, and organization by Vivek Kumar Singh.
