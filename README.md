# ✈️ SKYLINE - Flight Booking Platform

A modern, responsive flight booking application built with Next.js 15, featuring real-time flight search, dark mode support, and sophisticated GSAP animations.

![SKYLINE Logo](./public/logo.png)

## 🌟 Features

### Core Functionality

- **Real Flight Search**: Integration with Amadeus API for live flight data
- **Interactive UI**: Modern, mobile-first design with smooth animations
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all device sizes
- **Flight Deals**: Curated destination deals and offers
- **Advanced Animations**: GSAP-powered animations throughout the interface

### Technical Features

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Component Architecture**: Modular, reusable React components
- **API Integration**: RESTful API with Amadeus flight search
- **State Management**: React Context for global state
- **Performance Optimized**: Image optimization and lazy loading

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: GSAP with ScrollTrigger
- **Theme**: next-themes for dark mode

### Backend & APIs

- **API Routes**: Next.js API routes
- **Flight Data**: Amadeus Travel API
- **HTTP Client**: Axios

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Bundler**: Turbopack (Next.js 15)
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **Amadeus API Account**: For flight data access

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shafibr21/skyline.git
   cd skyline
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

   _Note: Use `--legacy-peer-deps` due to React 19 compatibility_

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Amadeus API Credentials
   AMADEUS_API_KEY=your_amadeus_api_key_here
   AMADEUS_API_SECRET=your_amadeus_api_secret_here
   ```

4. **Get Amadeus API Credentials**

   - Visit [Amadeus for Developers](https://developers.amadeus.com/)
   - Create a free account
   - Create a new application
   - Copy your API Key and Secret to `.env.local`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
skyline/
├── app/                     # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── flights/         # Flight search endpoint
│   │   └── token/           # Amadeus token management
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── sections/            # Page sections
│   │   ├── Header.tsx       # Navigation header
│   │   ├── HeroSection.tsx  # Hero banner with animations
│   │   ├── SearchSection.tsx # Flight search form
│   │   ├── ResultsSection.tsx # Search results display
│   │   ├── DealsSection.tsx # Featured deals
│   │   ├── WhySection.tsx   # Features showcase
│   │   └── Footer.tsx       # Site footer
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx       # Button component
│   │   ├── calendar.tsx     # Date picker
│   │   ├── toast.tsx        # Notification toast
│   │   └── theme-toggle.tsx # Dark mode toggle
│   ├── providers/           # Context providers
│   │   └── theme-provider.tsx # Theme management
│   └── HomePage.tsx         # Main page orchestrator
├── contexts/                # React contexts
│   └── FlightSearchContext.tsx # Flight search state
├── hooks/                   # Custom React hooks
│   └── useFlightSearch.tsx  # Flight search logic
├── lib/                     # Utility libraries
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
│   ├── logo.png             # SKYLINE logo
│   ├── plane.png            # Hero image
│   └── ...                  # Other images
└── ...config files
```

## 🎨 Design System

### Color Palette

- **Primary**: Electric Blue (`#3b82f6`)
- **Secondary**: Vivid Orange (`#f97316`)
- **Accent**: Vivid Purple (`#a855f7`)
- **Background**: White / Dark (`#ffffff` / `#0a0a0a`)

### Typography

- **Display Font**: DM Serif Display (headings)
- **Body Font**: Geist Sans (body text)
- **Mono Font**: Geist Mono (code)

### Components

All components follow a consistent design system with:

- Rounded corners (`border-radius: 0.75rem`)
- Smooth transitions and animations
- Responsive breakpoints
- Dark mode variants

## 🔧 API Integration

### Amadeus Flight Search API

The application integrates with Amadeus API for real flight data:

**Endpoints Used:**

- `POST /v1/security/oauth2/token` - Authentication
- `GET /v2/shopping/flight-offers` - Flight search

**Flow:**

1. Client initiates search via `SearchSection`
2. Request sent to `/api/flights`
3. Server authenticates with Amadeus (`/api/token`)
4. Flight data fetched and returned
5. Results displayed in `ResultsSection`

### Error Handling

- Network failures gracefully handled
- User-friendly error messages
- Fallback UI states

## 🎭 Animations

### GSAP Integration

The application features sophisticated animations powered by GSAP:

**Hero Section:**

- SplitText character-by-character animation
- Image fade and scale effects
- Magnetic button interactions

**Deals Section:**

- Staggered card entrance animations
- Scroll-triggered effects
- 3D hover transformations

**Why Section:**

- Word-by-word title reveals
- Sliding card animations
- Interactive hover effects

## 🌙 Dark Mode

Implemented using `next-themes` with:

- System preference detection
- Smooth transitions
- Persistent user choice
- Toggle button in header

## 📱 Responsive Design

**Breakpoints:**

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

**Features:**

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks
```

## 🔐 Environment Variables

Required environment variables:

```env
# Amadeus API (Required for flight search)
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**

   - Import project to Vercel
   - Connect your GitHub repository

2. **Environment Variables**

   - Add `AMADEUS_API_KEY` and `AMADEUS_API_SECRET`
   - Set in Vercel dashboard under Environment Variables

3. **Deploy**
   - Automatic deployment on git push
   - Production URL provided

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Amadeus API** - Flight data provider
- **Radix UI** - Accessible component primitives
- **GSAP** - Professional-grade animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Team** - Amazing React framework

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Email: [your-email@domain.com]
- Discord: [Your Discord Server]

---

**Built with ❤️ by [Shafi](https://github.com/shafibr21)**
