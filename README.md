# Climate Action Pledge Microsite

A modern, responsive web application that enables users to take climate action pledges, receive personalized certificates, and see their commitments displayed on a public pledge wall.

## Features

- **Hero Section**: Landing page with smooth scroll navigation to pledge form
- **Live KPI Dashboard**: Real-time display of pledge statistics with target goal of 1,000,000 pledges
- **Why Section**: Educational content explaining the importance of climate action
- **Pledge Form**: Comprehensive form with validation for:
  - Name, email, and mobile number
  - State selection (all 28 Indian states)
  - Profile type classification (Student, Professional, Entrepreneur, Homemaker, Retired, Other)
  - Multiple climate action commitments
  - 5-star rating system
  - Privacy protection notice
- **Success Animation**: Confetti celebration with congratulations splash screen on successful submission
- **Certificate Generator**: Personalized certificates displaying:
  - User's name and selected commitments
  - Unique pledge ID (format: PLG-YYYYMMDD-XXXX)
  - Star rating visualization
  - Download and share functionality
- **Google Sheets Integration**: Pledges are automatically saved to Google Sheets with fallback to mock data
- **Pledge Wall**: Public display of pledges with:
  - Initial display of 6 pledges
  - Paginated "Load More" functionality (6 pledges per load)
  - Maximum 30 pledges displayed
  - Email and mobile numbers kept private
  - State and profile information visible
- **Responsive Design**: Full compatibility across mobile, tablet, and desktop devices

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: lucide-react
- **Animations**: react-confetti, canvas-confetti, framer-motion
- **Scroll Library**: Lenis for smooth scrolling
- **Server Actions**: Next.js Server Actions for backend logic
- **Database**: Google Sheets API with mock data fallback
- **Intersection Observer**: For component visibility tracking
- **Deployment**: Vercel-ready configuration

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd climate-action-pledge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser to view the application

### Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Remove build artifacts and node_modules

## Google Sheets Integration (Optional)

The application supports persistent data storage through Google Sheets API:

1. **Environment Configuration**: Create a `.env.local` file with Google Sheets credentials:
   ```
   GOOGLE_SHEETS_PRIVATE_KEY=<your-private-key>
   GOOGLE_SHEETS_CLIENT_EMAIL=<your-client-email>
   GOOGLE_SHEET_ID=<your-spreadsheet-id>
   ```

2. **Service Account Setup**: 
   - Create a Google Cloud service account
   - Enable the Google Sheets API
   - Share your spreadsheet with the service account email

3. **Data Persistence**:
   - Without configuration: Mock data store is used (resets on server restart)
   - With credentials: All pledges are permanently saved to Google Sheets

4. **Fallback Mechanism**: If Google Sheets is unavailable, the application automatically falls back to mock data storage

## Project Structure

```
climate-action-pledge/
├── app/
│   ├── actions/
│   │   └── pledge.ts              Server-side functions for pledge operations
│   ├── layout.tsx                 Root layout with global metadata
│   ├── page.tsx                   Main application page with state management
│   └── globals.css                Global styles and animations
├── components/
│   ├── Certificate.tsx            Certificate display and download
│   ├── Footer.tsx                 Footer component
│   ├── HeroSection.tsx            Landing hero section with CTA
│   ├── KPISection.tsx             KPI metrics display
│   ├── KPISectionNew.tsx          Updated KPI component
│   ├── PledgeForm.tsx             Form for pledge submission with validation
│   ├── PledgeWall.tsx             Paginated public pledge display
│   ├── SmoothScroll.tsx           Smooth scroll navigation utility
│   ├── SuccessSplash.tsx          Success confirmation screen
│   ├── WhySection.tsx             Informational section
│   ├── WhySectionNew.tsx          Updated why section
│   └── ui/
│       ├── badge.tsx              Badge component
│       ├── button.tsx             Button component
│       ├── card.tsx               Card container component
│       ├── input.tsx              Input field component
│       ├── label.tsx              Label component
│       ├── select.tsx             Select dropdown component
│       └── textarea.tsx           Textarea component
├── lib/
│   ├── googleSheets.ts            Google Sheets API integration
│   ├── mockData.ts                Mock data store and utilities
│   └── utils.ts                   Helper utility functions
├── types/
│   └── pledge.ts                  TypeScript interfaces and constants
├── public/                        Static assets
├── components.json                shadcn/ui configuration
├── env.example                    Environment variables template
├── eslint.config.mjs              ESLint configuration
├── next.config.ts                 Next.js configuration
├── package.json                   Dependencies and scripts
├── postcss.config.mjs             PostCSS configuration
├── tsconfig.json                  TypeScript configuration
└── vercel.json                    Vercel deployment configuration
```

## Implementation Details

1. Hero Section: Users can view the landing section with smooth scroll navigation to the pledge form
2. KPI Dashboard: Live metrics display showing pledge statistics with 1,000,000 as the target
3. Why Section: Educational content explaining the importance of climate action
4. Pledge Form: Complete form with validation and privacy protection notice
5. Certificate Generation: Personalized certificates with user information and star rating
6. Pledge Wall: Public display of submissions with email/mobile privacy protection
7. Data Persistence: Pledges stored via Google Sheets with fallback to mock data
8. Responsive Design: Full device compatibility across mobile, tablet, and desktop
9. Certificate Management: Download and share functionality for certificates

## Key Features

### Smooth Navigation
- Lenis-powered smooth scrolling throughout the application
- Direct navigation from hero section to pledge form
- Intersection observer for component visibility tracking

### Accessibility
- Semantic HTML structure
- ARIA labels on form fields
- Keyboard navigation support
- Screen reader compatibility

### Performance
- Next.js App Router for optimized routing
- Server-side data fetching
- Client-side state management
- Efficient component rendering

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

## Future Enhancements

- Admin dashboard with analytics and insights
- Email notifications for pledge confirmations
- Social media sharing with Open Graph metadata
- PDF certificate downloads
- Rate limiting and CAPTCHA for spam protection
- Multi-language support
- Advanced search and filtering on pledge wall
- Data export functionality

## License

This project is available under the MIT License. See the LICENSE file for details.

## Version

Version 1.1.0 - Includes improved KPI sections and form validation
