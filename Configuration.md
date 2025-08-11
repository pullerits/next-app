# Configuration.md - Project Configuration Guide

## Overview

This document provides comprehensive information about all configuration files, environment variables, dependencies, and setup requirements for the Next.js e-commerce application.

## Configuration Files

### Next.js Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

**Purpose**: Next.js framework configuration
**Current State**: Minimal configuration using defaults
**Potential Additions**:
- Image domains for external image sources
- Environment variable configuration
- Build optimization settings
- Internationalization setup

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Features**:
- **Strict Mode**: Enabled for maximum type safety
- **Path Aliases**: `@/*` maps to root directory for clean imports
- **Next.js Plugin**: Integrated TypeScript support
- **ES2017 Target**: Modern JavaScript features support

### ESLint Configuration (`eslint.config.mjs`)

**Purpose**: Code quality and consistency enforcement
**Integration**: Next.js built-in ESLint configuration
**Rules**: Standard Next.js and React best practices

### PostCSS Configuration (`postcss.config.mjs`)

**Purpose**: CSS processing configuration
**Integration**: Tailwind CSS integration
**Features**: CSS transformation and optimization

## Package Dependencies

### Production Dependencies (`package.json`)

```json
{
  "dependencies": {
    "@stripe/react-stripe-js": "^3.9.0",
    "@stripe/stripe-js": "^7.8.0",
    "next": "15.4.5",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "stripe": "^18.4.0"
  }
}
```

#### Core Framework
- **next**: Next.js framework (v15.4.5)
- **react**: React library (v19.1.0)
- **react-dom**: React DOM rendering (v19.1.0)

#### Payment Processing
- **@stripe/stripe-js**: Stripe JavaScript SDK for client-side integration
- **@stripe/react-stripe-js**: React components for Stripe Elements
- **stripe**: Server-side Stripe SDK for API interactions

### Development Dependencies

```json
{
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.4.5",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

#### TypeScript Support
- **typescript**: TypeScript compiler (v5)
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions

#### Styling
- **tailwindcss**: Tailwind CSS framework (v4)
- **@tailwindcss/postcss**: PostCSS integration

#### Code Quality
- **eslint**: ESLint linter (v9)
- **eslint-config-next**: Next.js ESLint configuration
- **@eslint/eslintrc**: ESLint configuration support

## Environment Variables

### Required Variables (`.env.local`)

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

#### Stripe Integration
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Client-side Stripe publishable key
  - Prefix: `NEXT_PUBLIC_` makes it available in browser
  - Usage: Stripe Elements initialization
  - Security: Safe to expose in client-side code

- **STRIPE_SECRET_KEY**: Server-side Stripe secret key
  - Usage: Payment Intent creation, server-side API calls
  - Security: Server-only, never exposed to client

- **STRIPE_WEBHOOK_SECRET**: Webhook endpoint verification
  - Usage: Webhook signature verification (future implementation)
  - Security: Server-only for webhook security

### Environment Setup

#### Development Setup
1. Copy `.env.local.example` to `.env.local`
2. Get Stripe keys from Stripe Dashboard
3. Replace placeholder values with actual keys
4. Restart development server

#### Production Setup
- Set environment variables in deployment platform
- Use production Stripe keys for live environment
- Configure webhook endpoints for production

## Scripts Configuration

### NPM Scripts (`package.json`)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### Development Scripts
- **`npm run dev`**: Start development server with Turbopack
- **`npm run build`**: Create production build
- **`npm run start`**: Start production server
- **`npm run lint`**: Run ESLint code quality checks

#### Build Configuration
- **Turbopack**: Enabled for faster development builds
- **Production Build**: Optimized for deployment
- **Linting**: Automated code quality validation

## Deployment Configuration

### Vercel Configuration (Recommended)

```javascript
// vercel.json (optional)
{
  "env": {
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "@stripe_publishable_key",
    "STRIPE_SECRET_KEY": "@stripe_secret_key",
    "STRIPE_WEBHOOK_SECRET": "@stripe_webhook_secret"
  }
}
```

### Environment Variables Setup
1. **Vercel Dashboard**: Configure environment variables
2. **Build Settings**: Automatic Next.js detection
3. **Domain Setup**: Custom domain configuration
4. **SSL**: Automatic HTTPS certificate

### Other Platforms

#### Netlify
- Configure build command: `npm run build`
- Configure publish directory: `.next`
- Add environment variables in site settings

#### Railway/Heroku
- Configure buildpacks for Node.js
- Set environment variables in platform settings
- Configure start command: `npm run start`

## Development Setup Guide

### Prerequisites
- **Node.js**: Version 18+ recommended
- **npm**: Version 8+ or yarn/pnpm alternative
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd next-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Stripe keys
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000
   - Verify all features work correctly

### Stripe Setup

1. **Create Stripe Account**
   - Visit https://dashboard.stripe.com
   - Create account or sign in

2. **Get API Keys**
   - Navigate to Developers > API keys
   - Copy Publishable key and Secret key
   - Use test keys for development

3. **Configure Webhooks** (Future)
   - Create webhook endpoint
   - Configure events to listen for
   - Copy webhook secret

## Build and Deployment

### Production Build Process

1. **Environment Validation**
   ```bash
   # Verify all required environment variables are set
   npm run build
   ```

2. **Build Optimization**
   - Static generation for performance
   - Code splitting and optimization
   - Image optimization
   - CSS optimization

3. **Testing**
   ```bash
   npm run lint
   npm run build
   npm run start
   ```

### Performance Considerations

#### Build Optimization
- **Static Generation**: Pre-built pages for better performance
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Tree Shaking**: Unused code removal

#### Runtime Performance
- **Server Components**: Reduced client-side JavaScript
- **Streaming**: Progressive page loading
- **Caching**: Automatic caching strategies
- **CDN**: Static asset distribution

## Security Configuration

### API Security
- **Environment Variables**: Sensitive data in environment variables
- **HTTPS**: Enforced HTTPS in production
- **CORS**: Configured for API routes
- **Rate Limiting**: Consider adding for API protection

### Stripe Security
- **PCI Compliance**: Stripe handles PCI compliance
- **Webhook Verification**: Webhook signature validation
- **Key Management**: Separate test and production keys
- **Client-side Security**: No sensitive data in client code

## Monitoring and Analytics

### Potential Integrations
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error monitoring and reporting
- **Stripe Dashboard**: Payment monitoring

### Performance Monitoring
- **Core Web Vitals**: Performance metrics
- **Build Analytics**: Bundle size analysis
- **API Performance**: Response time monitoring
- **User Experience**: Real user monitoring

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Restart development server after changes
   - Verify `.env.local` is in root directory
   - Check variable names and prefixes

2. **Stripe Integration Issues**
   - Verify API keys are correct
   - Check network connectivity
   - Validate environment variable names

3. **Build Failures**
   - Run `npm run lint` to check for errors
   - Verify TypeScript types are correct
   - Check for missing dependencies

4. **TypeScript Errors**
   - Update type definitions
   - Check import paths
   - Verify component prop types

### Debug Mode
- Enable Next.js debug mode with `DEBUG=next:*`
- Use browser developer tools for client-side debugging
- Check server logs for API route issues