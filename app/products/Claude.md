# Claude.md - Products Directory

## Directory Overview

The `app/products/` directory contains product-related pages including the main product catalog and individual product detail pages with dynamic routing.

## Files and Structure

```
products/
├── [id]/
│   ├── AddToCart.tsx     # Add to cart component for product pages
│   └── page.tsx          # Dynamic product detail page
└── page.tsx              # Product catalog listing page
```

## Product Catalog Page (`page.tsx`)

### Purpose
Main product listing page that displays all available products in a grid layout for browsing and selection.

### Component Type
**Server Component** - Static content with product data

### Key Features
- **Product Grid Display**: Organized product listing
- **Responsive Layout**: Mobile-optimized product cards
- **Product Navigation**: Links to individual product pages
- **SEO Optimization**: Server-side rendering for search engines

### Data Integration
- Uses mock product data from `lib/mock-data.ts`
- Server-side rendering for optimal performance
- Static generation for fast page loads

## Product Detail Page (`[id]/page.tsx`)

### Purpose
Dynamic product detail pages showing comprehensive product information and purchase options.

### Component Type
**Server Component (Async)** - Handles dynamic routing with async parameters

### Route Parameters
```typescript
interface ProductPageProps {
  params: Promise<{ id: string }>;
}
```

### Key Features

#### Product Information Display
- **Product Images**: High-quality product photography
- **Product Details**: Name, description, pricing
- **Discount Calculation**: Original vs. sale price display
- **Variant Information**: Size, color, or other options

#### Navigation
- **Breadcrumb Navigation**: Home > Products > Current Product
- **Related Products**: Suggestions for similar items
- **Category Navigation**: Links to product categories

#### Purchase Integration
- **Add to Cart**: Integration with cart system
- **Quantity Selection**: Choose quantity before adding
- **Stock Information**: Availability status
- **Pricing Display**: Clear price formatting

### Dynamic Routing Implementation

#### Parameter Handling
```typescript
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }
  // ... rest of component
}
```

#### Error Handling
- **Product Not Found**: Automatic 404 page redirect
- **Invalid Parameters**: Graceful error handling
- **Data Validation**: Product existence verification

### UI Components Used

#### Layout Components
- **Navbar**: Site navigation (inherited from layout)
- **Footer**: Site footer (inherited from layout)
- **Breadcrumb**: Custom navigation component

#### Product Components
- **Image Gallery**: Product image display and gallery
- **Price Display**: Formatted pricing with discounts
- **Product Information**: Details and specifications
- **AddToCart**: Purchase functionality component

#### Interactive Elements
- **Add to Cart Button**: Purchase action
- **Quantity Selector**: Amount selection
- **Image Zoom**: Product image interaction
- **Variant Selection**: Product options

### Styling and Design

#### Layout Structure
- **Full Width**: Utilizes full page width
- **Grid System**: Responsive product information layout
- **Image Gallery**: Prominent product photography
- **Information Panels**: Organized product details

#### Visual Hierarchy
- **Product Name**: Large, prominent title
- **Price Display**: Highlighted pricing information
- **Call to Action**: Prominent add to cart button
- **Supporting Details**: Secondary information styling

#### Responsive Design
- **Mobile Optimization**: Touch-friendly interface
- **Image Scaling**: Responsive product images
- **Text Scaling**: Readable on all devices
- **Button Sizing**: Appropriate for touch interaction

## Add to Cart Component (`[id]/AddToCart.tsx`)

### Purpose
Dedicated component for adding products to the shopping cart with loading states and feedback.

### Component Type
**Client Component** - Requires cart state interaction

### Key Features

#### Cart Integration
```typescript
const { addItem } = useCart();
```

#### Product Addition
```typescript
const handleAddToCart = async () => {
  setIsAdding(true);
  
  addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0] || '/placeholder.svg',
  });

  setTimeout(() => setIsAdding(false), 300);
};
```

#### User Experience
- **Loading States**: Visual feedback during cart addition
- **Success Feedback**: Confirmation of successful addition
- **Error Handling**: Graceful error management
- **Accessibility**: Screen reader compatible

### Props Interface
```typescript
interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}
```

### Integration Points

#### CartContext
- **State Updates**: Adds items to global cart state
- **Persistence**: Automatic localStorage synchronization
- **UI Updates**: Triggers cart count updates in navigation

#### Product Data
- **Product Information**: Receives product details as props
- **Image Handling**: Uses first product image or placeholder
- **Price Formatting**: Consistent price display

## Data Flow

### Product Catalog Flow
1. **Server Rendering**: Product data loaded server-side
2. **Grid Display**: Products rendered in responsive grid
3. **User Navigation**: Click navigates to product detail page

### Product Detail Flow
1. **Dynamic Route**: URL parameter determines product ID
2. **Data Fetching**: Product data retrieved by ID
3. **Page Rendering**: Product information displayed
4. **Cart Integration**: Add to cart functionality available

### Add to Cart Flow
1. **User Action**: User clicks add to cart button
2. **Loading State**: Button shows loading indicator
3. **Cart Update**: Product added to global cart state
4. **Feedback**: Success state displayed to user
5. **Persistence**: Cart data saved to localStorage

## Performance Considerations

### Optimization Strategies
- **Server-side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Automatic with App Router
- **Static Generation**: Pre-built pages for better performance

### Loading Performance
- **Minimal JavaScript**: Server components reduce bundle size
- **Efficient State Updates**: Optimized cart state management
- **Image Loading**: Lazy loading for non-critical images
- **Font Optimization**: Google Fonts optimization

## SEO and Accessibility

### SEO Features
- **Meta Tags**: Dynamic metadata for each product
- **Structured Data**: Product schema markup
- **URL Structure**: SEO-friendly product URLs
- **Image Alt Text**: Descriptive image descriptions

### Accessibility Features
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators