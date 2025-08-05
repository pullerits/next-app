# Web Store Template

A complete e-commerce website template built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This template provides a solid foundation for building online stores with modern design and responsive layout.

## Features

- 🛍️ Complete e-commerce frontend structure
- 📱 Responsive design with dark mode support
- 🎨 Modern UI with Tailwind CSS
- ⚡ Built with Next.js 15 App Router
- 🔍 TypeScript for type safety
- 🖼️ Optimized images with Next.js Image component
- 📦 Product catalog with categories and filters
- 🛒 Shopping cart interface (ready for state management)
- ⭐ Product ratings and reviews display
- 💳 Checkout page structure

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone or download this template
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the store.

## How This Project Works (For React Developers)

If you're coming from React and new to Next.js, here are the key differences and concepts:

### File-Based Routing

Unlike React Router, Next.js uses **file-based routing**. The file structure in the `app/` directory directly maps to URLs:

```
app/
├── page.tsx                    → / (homepage)
├── products/
│   ├── page.tsx               → /products
│   └── [id]/
│       └── page.tsx           → /products/123 (dynamic route)
└── cart/
    └── page.tsx               → /cart
```

- `page.tsx` files are the actual pages that users visit
- `[id]` folders create dynamic routes (like `/products/1`, `/products/2`)

### App Router vs Pages Router

This project uses Next.js 13+ **App Router** (not the older Pages Router):

- **Server Components by default**: Components run on the server unless marked with `'use client'`
- **Layouts**: Shared UI that persists across pages
- **Better performance**: Automatic code splitting and optimizations

### Server vs Client Components

```tsx
// Server Component (default) - runs on server
export default function ProductPage() {
  // Can directly access databases, APIs, etc.
  return <div>Product Info</div>
}

// Client Component - runs in browser
'use client'
export default function CartButton() {
  // Can use hooks, event handlers, browser APIs
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Add to Cart</button>
}
```

### Layouts

Layouts wrap pages and provide shared UI:

```tsx
// app/layout.tsx - Root layout (wraps entire app)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

// app/(store)/layout.tsx - Store layout (wraps store pages)
export default function StoreLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

### How Pages Are Built

1. **Homepage** (`app/page.tsx`):
   - Shows featured products
   - Includes header and footer layout
   - Server-rendered for better SEO

2. **Products Page** (`app/products/page.tsx`):
   - Lists all products with filters
   - Server component loads data
   - Client components handle interactions

3. **Product Detail** (`app/products/[id]/page.tsx`):
   - Dynamic route receives `id` parameter
   - Finds product from mock data
   - Shows detailed product information

4. **Cart Page** (`app/cart/page.tsx`):
   - Currently shows empty cart UI
   - Ready for state management integration

### Data Flow

Currently using **mock data** (`lib/mock-data.ts`):

```tsx
// In a page component
import { mockProducts } from '@/lib/mock-data'

export default function ProductsPage() {
  // mockProducts is available immediately (server-side)
  return <ProductGrid products={mockProducts} />
}
```

In production, you'd replace this with:
- API calls to your backend
- Database queries (in Server Components)
- External data sources

### Styling with Tailwind

Instead of CSS modules or styled-components, this uses **Tailwind CSS**:

```tsx
// Instead of separate CSS files
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
    Product Name
  </h1>
</div>
```

- Classes are applied directly to elements
- `dark:` prefix for dark mode variants
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

### Key Next.js Features Used

1. **Image Optimization**: `next/image` automatically optimizes images
2. **Font Optimization**: `next/font` loads fonts efficiently
3. **Automatic Code Splitting**: Each page only loads needed code
4. **SEO-Friendly**: Server-side rendering for better search rankings

### What's Missing (And Why)

- **State Management**: Template focuses on structure; add Redux/Zustand later
- **API Integration**: Uses mock data; replace with real endpoints
- **Authentication**: Not included; add based on your needs
- **Payment Processing**: Frontend structure only; integrate with Stripe/PayPal

This gives you a solid foundation that's much more structured than a typical React SPA!

## Project Structure

```
├── app/
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Header, Footer components
│   ├── products/          # Product-related components
│   └── cart/              # Cart-related components
├── lib/
│   ├── types.ts           # TypeScript type definitions
│   └── mock-data.ts       # Sample product data
└── public/                # Static assets
```

## Available Pages

- `/` - Homepage with featured products
- `/products` - All products with filtering
- `/products/[id]` - Individual product detail
- `/cart` - Shopping cart (structure ready)

## Customization

### Adding Real Products

1. Replace the mock data in `lib/mock-data.ts` with your actual product data
2. Update product images in the `public/` folder
3. Modify the `Product` interface in `lib/types.ts` if needed

### Styling

- Global styles: `app/globals.css`
- Component styles: Tailwind CSS classes
- Dark mode: Automatically supported via CSS variables

### Adding State Management

The template is ready for state management. Consider adding:
- Zustand (lightweight)
- Redux Toolkit (complex state)
- React Context (simple state)

### Backend Integration

Connect to your preferred backend:
- Replace mock data with API calls
- Add authentication
- Implement payment processing
- Add order management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Geist Font** - Modern typography

## Next Steps

1. **Add State Management**: Implement cart functionality with your preferred state solution
2. **Connect Backend**: Replace mock data with real API endpoints
3. **Add Authentication**: User accounts and login system
4. **Payment Integration**: Stripe, PayPal, or other payment processors
5. **SEO Optimization**: Meta tags, structured data, sitemaps
6. **Performance**: Image optimization, lazy loading, caching
7. **Testing**: Unit tests, integration tests, e2e tests

## License

This template is free to use for personal and commercial projects.
