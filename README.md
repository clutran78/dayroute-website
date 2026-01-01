# DayRoute Marketing Website

Production-ready marketing website for DayRoute, an iOS field-service day planner for Australian mobile professionals.

**Live URL:** https://dayroute.com.au

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Email:** Resend

## Features

- ✅ Mobile-first responsive design
- ✅ Dark theme with teal accent colours
- ✅ SEO optimised with meta tags, Open Graph, Twitter cards
- ✅ Schema.org JSON-LD (Organization, SoftwareApplication, FAQPage)
- ✅ Sitemap and robots.txt
- ✅ Apple App Store compliance (Privacy Policy, Terms, Support pages)
- ✅ Contact form with email integration (Resend)
- ✅ LLM SEO friendly (clear FAQs, direct language)

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home - Hero, features preview, pricing preview, waitlist |
| `/features` | Detailed feature breakdown |
| `/pricing` | Subscription plans (Free, Pro, Team) |
| `/use-cases` | Industry-specific use cases |
| `/security` | Data handling and privacy practices |
| `/faq` | Frequently asked questions (with schema) |
| `/support` | Support centre, contact form, troubleshooting |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/contact` | Redirects to `/support#contact` |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Resend API key (optional, for contact form emails)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd dayroute-website

# Install dependencies
bun install
# or
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file with:

```env
# Resend API Key for support form emails
# Get from https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxx
```

If no Resend API key is provided, form submissions will be logged to console instead.

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - Add `RESEND_API_KEY` with your Resend API key
5. Click "Deploy"

### 3. Connect Custom Domain (dayroute.com.au)

After deployment:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add `dayroute.com.au`
4. Vercel will provide DNS records to add

### DNS Configuration

Add these records at your domain registrar:

**Option A: Using Vercel DNS (recommended)**
```
Type: A
Name: @
Value: 76.76.21.21

Type: AAAA
Name: @
Value: 2606:4700:7::a29f:1015

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Option B: Using CNAME only**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Note: Some registrars don't support CNAME at apex domain. Use Option A in that case.

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. No action required.

## Apple App Store URLs

Use these URLs when submitting to App Store Connect:

| Field | URL |
|-------|-----|
| Marketing URL | `https://dayroute.com.au` |
| Support URL | `https://dayroute.com.au/support` |
| Privacy Policy URL | `https://dayroute.com.au/privacy` |

## Project Structure

```
dayroute-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   │   └── support/    # Contact form handler
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── use-cases/
│   │   ├── security/
│   │   ├── faq/
│   │   ├── support/
│   │   ├── privacy/
│   │   ├── terms/
│   │   ├── contact/
│   │   ├── layout.tsx      # Root layout with schema
│   │   ├── page.tsx        # Home page
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── lib/
│       └── utils.ts        # cn() helper
├── public/                  # Static assets
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

## Customisation

### Updating Pricing

Edit `src/app/pricing/page.tsx` to update subscription prices and features.

### Updating Contact Email

The support form sends emails to `support@dayroute.com.au`. Update in `src/app/api/support/route.ts`.

### Adding App Store Link

Once your app is live, replace the "Coming Soon" buttons with actual App Store links:

1. Search for `/#download` in the codebase
2. Replace with your App Store URL: `https://apps.apple.com/au/app/dayroute/id{your-app-id}`

## Performance

The site is optimised for Lighthouse performance:

- Server-side rendering
- Optimised fonts (Inter via next/font)
- Minimal JavaScript
- No heavy animation libraries
- Responsive images

## SEO

Each page includes:

- Unique `<title>` and `<meta description>`
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Schema.org JSON-LD where appropriate

## License

Proprietary - All rights reserved.
