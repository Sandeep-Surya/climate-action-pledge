# Climate Action Pledge

A modern web application for climate action pledges featuring an interactive 3D globe, personalized certificates, and real-time pledge tracking.

## Features

- **Interactive 3D Globe**: Real-time visualization of pledges across India with state-wise distribution
- **Multi-Step Pledge Form**: Intuitive 3-step form with validation and privacy protection
- **Personalized Certificates**: Auto-generated certificates with unique IDs and star ratings
- **Live Dashboard**: Real-time KPI tracking with 1,000,000 pledge target
- **Pledge Wall**: Public display of pledges with pagination and privacy controls
- **Google Sheets Integration**: Automatic data persistence with fallback to local storage
- **Modern UI**: Neo-morphism design with smooth animations and responsive layout

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **3D Visualization**: Three.js, react-globe.gl
- **Animations**: Framer Motion
- **Database**: Google Sheets API

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## Environment Configuration

Create a `.env.local` file for Google Sheets integration:

```env
GOOGLE_SHEETS_PRIVATE_KEY=<your-private-key>
GOOGLE_SHEETS_CLIENT_EMAIL=<your-client-email>
GOOGLE_SHEET_ID=<your-spreadsheet-id>
```

**Note**: The application uses local storage fallback if Google Sheets is not configured.

## Project Structure

```
climate-action-pledge/
├── app/                          # Next.js app directory
│   ├── actions/                  # Server actions
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── Certificate.tsx
│   ├── Globe3D.tsx
│   ├── HeroSection.tsx
│   ├── KPISectionNew.tsx
│   ├── PledgeFormEnhanced.tsx
│   ├── PledgeWallNew.tsx
│   ├── SuccessSplash.tsx
│   └── WhySectionTabbed.tsx
├── lib/                          # Utility functions
│   ├── googleSheets.ts
│   ├── mockData.ts
│   └── utils.ts
├── types/                        # TypeScript types
│   └── pledge.ts
└── public/                       # Static assets
```
7. **Micro-interactions**: Subtle animations on hover, focus, and click
8. **Environmental Color Psychology**: Nature-inspired palette evoking sustainability

### 🌐 Interactive Elements
- **3D Globe**: Real-time demographic visualization with WebGL
- **Multi-step Forms**: Progress-tracked, validated form experience
- **Animated Transitions**: Smooth page-to-page animations
- **Hover States**: Rich feedback on all interactive elements

### ⚡ Performance Optimizations
- **Dynamic Imports**: Lazy loading of 3D globe component
- **Hardware Acceleration**: CSS transforms with will-change
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Next.js automatic image optimization
- **Font Display Swap**: Fast text rendering with web fonts

### ♿ Accessibility
- Semantic HTML structure
- ARIA labels on form fields
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios for readability

## Deployment

### Vercel Deployment

1. Push code to GitHub repository
2. Connect repository to Vercel dashboard
3. Deploy with automatic configuration

Alternatively, use Vercel CLI:
```bash
npm install -g vercel
vercel
```

The `vercel.json` configuration file is pre-configured for deployment.

## Environment Variables

Create a `.env.local` file in the root directory. See `env.example` for reference:

```
GOOGLE_SHEETS_PRIVATE_KEY=<service-account-private-key>
GOOGLE_SHEETS_CLIENT_EMAIL=<service-account-email>
GOOGLE_SHEET_ID=<spreadsheet-id>
```

## Design Philosophy

The 2025 redesign focuses on:
- **Environmental Authenticity**: Light, nature-inspired colors replacing dark themes
- **Engagement**: Interactive 3D elements and multi-step forms
- **Performance**: Smooth 60fps animations with hardware acceleration
- **Accessibility**: WCAG 2.1 AA compliance
- **Modern Trends**: Neo-morphism, glass-morphism, kinetic typography

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Frame Rate**: 60fps on modern devices
- **Bundle Size**: Optimized with code splitting

## Future Enhancements

- Enhanced 3D globe with real-time updates
- AR/VR pledge experience
- Admin dashboard with analytics and insights
- Email notifications for pledge confirmations
- Social media sharing with Open Graph metadata
- PDF certificate downloads
- Rate limiting and CAPTCHA for spam protection
- Multi-language support
- Advanced search and filtering on pledge wall
- Data export functionality
- AI-powered commitment suggestions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Version

Version 2.0.0 - Major Design Overhaul (2025)
- Complete visual redesign with light environmental theme
- 3D interactive globe with demographic visualization
- Multi-step interactive form with progress tracking
- Modern typography system with 4 Google Fonts
- Neo-morphism and glass-morphism UI effects
- Kinetic typography and text masking
- Performance optimizations and hardware acceleration
- Enhanced animations with liquid morphing effects
