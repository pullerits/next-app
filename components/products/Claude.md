# Claude.md - Product Components Directory

## Directory Overview

The `components/products/` directory contains reusable components for displaying products in various formats, including individual product cards and grid layouts for product collections.

## Files

```
products/
├── ProductCard.tsx      # Individual product display card
├── ProductGrid.tsx      # Grid layout for product collections
└── ProductCatalog.tsx   # Complete product catalog with filtering and sorting
```

## ProductCard Component (`ProductCard.tsx`)

### Purpose
Reusable product card component for displaying individual products with consistent styling, product information, and interaction capabilities.

### Component Type
**Server Component** - Static product display with client-side navigation

### Props Interface
```typescript
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    description?: string;
    rating?: number;
    reviewCount?: number;
  };
}
```

### Key Features

#### Product Display
- **Product Image**: Optimized image display with hover effects
- **Product Name**: Clear, readable product title
- **Price Display**: Current price with optional original price
- **Discount Badge**: Visual discount percentage indicator
- **Rating Display**: Star ratings and review counts

#### Interactive Elements
- **Clickable Card**: Entire card links to product detail page
- **Hover Effects**: Visual feedback on mouse hover
- **Image Gallery**: Multiple image support with primary display
- **Quick Actions**: Add to cart or quick view options

#### Visual Design
- **Card Layout**: Clean, contained design with shadow
- **Image Aspect Ratio**: Consistent image dimensions
- **Typography Hierarchy**: Clear information hierarchy
- **Responsive Design**: Adapts to different screen sizes

### UI Structure

#### Card Layout
```typescript
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  {/* Product Image */}
  <div className="relative aspect-square">
    <Link href={`/products/${product.id}`}>
      <Image
        src={product.images[0] || '/placeholder.svg'}
        alt={product.name}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
      />
    </Link>
    
    {/* Discount Badge */}
    {product.originalPrice && (
      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
        {discountPercentage}% OFF
      </div>
    )}
  </div>
  
  {/* Product Information */}
  <div className="p-4">
    <Link href={`/products/${product.id}`}>
      <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
        {product.name}
      </h3>
    </Link>
    
    {/* Rating */}
    {product.rating && (
      <div className="flex items-center mt-1">
        <StarRating rating={product.rating} />
        <span className="text-sm text-gray-500 ml-1">
          ({product.reviewCount})
        </span>
      </div>
    )}
    
    {/* Price */}
    <div className="mt-2 flex items-center space-x-2">
      <span className="text-xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </span>
      {product.originalPrice && (
        <span className="text-sm text-gray-500 line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
      )}
    </div>
    
    {/* Add to Cart Button */}
    <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
      Add to Cart
    </button>
  </div>
</div>
```

### Styling System

#### Card Design
- **Background**: Clean white background
- **Shadows**: Subtle shadow with hover enhancement
- **Rounded Corners**: Modern rounded corner design
- **Overflow Hidden**: Clean image containment

#### Image Handling
- **Aspect Ratio**: Square aspect ratio for consistency
- **Object Fit**: Cover fitting for consistent image display
- **Hover Effects**: Scale transform on hover
- **Fallback Images**: Placeholder for missing images

#### Typography
- **Product Name**: Large, readable product titles
- **Price Display**: Bold, prominent pricing
- **Ratings**: Smaller, secondary text for reviews
- **Discount Text**: Attention-grabbing discount information

### Price Formatting

#### Discount Calculation
```typescript
const discountPercentage = product.originalPrice 
  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  : 0;
```

#### Price Display
- **Current Price**: Bold, prominent display
- **Original Price**: Strikethrough styling
- **Currency**: Consistent dollar symbol usage
- **Decimal Places**: Always 2 decimal places

### Responsive Design

#### Mobile Optimization
- **Touch Targets**: Appropriate button sizes for mobile
- **Text Scaling**: Readable text at mobile sizes
- **Image Loading**: Optimized image loading for mobile
- **Card Spacing**: Appropriate spacing for mobile grids

#### Desktop Enhancement
- **Hover Effects**: Enhanced desktop interactions
- **Larger Images**: Better image display on larger screens
- **Enhanced Typography**: Improved readability on desktop

## ProductGrid Component (`ProductGrid.tsx`)

### Purpose
Container component for displaying collections of products in a responsive grid layout with customizable columns and spacing.

### Component Type
**Server Component** - Static grid layout with product cards

### Props Interface
```typescript
interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}
```

### Key Features

#### Grid Layout
- **Responsive Columns**: Customizable column counts per breakpoint
- **Consistent Spacing**: Uniform gaps between products
- **Auto-fit**: Automatic product card sizing
- **Grid Flexibility**: Adapts to different product counts

#### Section Header
- **Optional Title**: Section title display
- **View All Link**: Link to full product catalog
- **Filter Options**: Product filtering and sorting
- **Count Display**: Number of products shown

#### Loading and Pagination
- **Load More**: Progressive product loading
- **Infinite Scroll**: Continuous loading on scroll
- **Skeleton Loading**: Loading states for products
- **Empty State**: Handling for no products

### UI Structure

#### Grid Container
```typescript
<section className="py-12">
  {/* Section Header */}
  {title && (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <Link href="/products" className="text-blue-600 hover:text-blue-700">
        View All →
      </Link>
    </div>
  )}
  
  {/* Product Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
  
  {/* Load More */}
  {showLoadMore && (
    <div className="text-center mt-8">
      <button 
        onClick={onLoadMore}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Load More Products
      </button>
    </div>
  )}
</section>
```

### Responsive Grid System

#### Breakpoint Configuration
```typescript
const defaultColumns = {
  mobile: 1,    // 1 column on mobile
  tablet: 2,    // 2 columns on tablet
  desktop: 4    // 4 columns on desktop
};

// Tailwind classes
const gridClasses = `
  grid 
  grid-cols-${columns.mobile} 
  sm:grid-cols-${columns.tablet} 
  lg:grid-cols-${columns.desktop}
  gap-6
`;
```

#### Flexible Layout
- **Auto Columns**: Grid auto-fit for varying product counts
- **Min/Max Width**: Product card size constraints
- **Aspect Ratios**: Consistent card proportions
- **Gap Management**: Responsive spacing between cards

### Data Handling

#### Product Processing
- **Data Validation**: Ensures product data integrity
- **Image Fallbacks**: Handles missing product images
- **Price Formatting**: Consistent price display
- **Availability**: Stock status handling

#### Performance
- **Virtual Scrolling**: Efficient rendering for large product lists
- **Image Lazy Loading**: Progressive image loading
- **Pagination**: Efficient data loading strategies
- **Caching**: Product data caching for performance

### State Management

#### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);
const [products, setProducts] = useState([]);
const [hasMore, setHasMore] = useState(true);
```

#### Error Handling
- **Network Errors**: Graceful handling of API failures
- **Empty Results**: User-friendly empty state display
- **Loading Failures**: Retry mechanisms for failed loads

### Integration Points

#### Product Card Integration
- **Consistent Props**: Standardized product data passing
- **Event Handling**: Cart actions and navigation
- **State Synchronization**: Product updates and cart changes

#### Navigation Integration
- **Category Filtering**: Product category navigation
- **Search Integration**: Search result display
- **Breadcrumb Support**: Navigation context

### Performance Considerations

#### Optimization Strategies
- **Component Memoization**: Prevent unnecessary re-renders
- **Image Optimization**: Next.js Image component usage
- **Lazy Loading**: Progressive content loading
- **Bundle Splitting**: Efficient code splitting

#### Loading Performance
- **Skeleton Screens**: Loading state placeholders
- **Progressive Enhancement**: Works without JavaScript
- **Efficient Queries**: Optimized data fetching
- **Caching Strategy**: Client and server-side caching

## ProductCatalog Component (`ProductCatalog.tsx`)

### Purpose
Complete product catalog interface with advanced filtering, sorting, and display capabilities. Serves as the main product browsing experience with comprehensive filter options and responsive layout.

### Component Type
**Client Component** - Interactive filtering and sorting requires client-side state management

### Props Interface
```typescript
interface ProductCatalogProps {
  products: Product[];
}
```

### Key Features

#### Advanced Filtering System
- **Category Filter**: Dynamic categories generated from product data
- **Price Range Filters**: Under $50, $50-$100, Over $100 (multi-select with OR logic)
- **Availability Filters**: In Stock Only, On Sale Only
- **Clear All Filters**: One-click filter reset functionality

#### Sorting Options
- **Price**: Low to High, High to Low
- **Name**: Alphabetical A-Z sorting
- **Rating**: Highest rated products first
- **Default**: No sorting applied

#### User Experience
- **Real-time Filtering**: Instant results without page reload
- **Filter State Visibility**: Clear indication when filters are active
- **Responsive Design**: Sidebar filters collapse on mobile
- **Performance Optimized**: Efficient re-rendering with useMemo

### State Management

#### Filter States
```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('all');
const [sortBy, setSortBy] = useState<SortOption>('');
const [under50, setUnder50] = useState<boolean>(false);
const [between50And100, setBetween50And100] = useState<boolean>(false);
const [over100, setOver100] = useState<boolean>(false);
const [inStockOnly, setInStockOnly] = useState<boolean>(false);
const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
```

#### Filter Management Functions
```typescript
const clearAllFilters = () => {
  setSelectedCategory('all');
  setSortBy('');
  setUnder50(false);
  setBetween50And100(false);
  setOver100(false);
  setInStockOnly(false);
  setOnSaleOnly(false);
};

const hasActiveFilters = selectedCategory !== 'all' || under50 || 
  between50And100 || over100 || inStockOnly || onSaleOnly;
```

### Filtering Logic Implementation

#### Category Filtering
```typescript
// Dynamic categories from product data
const categories = useMemo(() => {
  const set = new Set<string>();
  products.forEach((p) => set.add(p.category));
  return Array.from(set).sort();
}, [products]);

// Apply category filter
if (selectedCategory !== 'all') {
  result = result.filter((p) => p.category === selectedCategory);
}
```

#### Price Range Filtering
```typescript
// Multi-select price ranges with OR logic
const anyPriceFilter = under50 || between50And100 || over100;
if (anyPriceFilter) {
  result = result.filter((p) => {
    const price = p.price;
    const isUnder50 = under50 && price < 50;
    const isBetween = between50And100 && price >= 50 && price <= 100;
    const isOver100 = over100 && price > 100;
    return isUnder50 || isBetween || isOver100;
  });
}
```

#### Availability Filtering
```typescript
// In stock filter
if (inStockOnly) {
  result = result.filter((p) => p.inStock);
}

// On sale filter (products with original price higher than current)
if (onSaleOnly) {
  result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
}
```

#### Sorting Implementation
```typescript
// Sort results based on selected option
if (sortBy === 'price-low') {
  result.sort((a, b) => a.price - b.price);
} else if (sortBy === 'price-high') {
  result.sort((a, b) => b.price - a.price);
} else if (sortBy === 'name') {
  result.sort((a, b) => a.name.localeCompare(b.name));
} else if (sortBy === 'rating') {
  result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}
```

### UI Structure and Layout

#### Page Header
- **Title and Description**: Shop branding and tagline
- **Sort Dropdown**: Primary sorting controls
- **Category Dropdown**: Quick category selection

#### Promotional Banner
- **Marketing Content**: Limited time offers and bundles
- **Call-to-Action**: Shop bundles button
- **Responsive Design**: Stacks on mobile, side-by-side on desktop

#### Two-Column Layout
```typescript
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  {/* Sidebar Filters - 1 column */}
  <aside className="lg:col-span-1">
    {/* Filter controls */}
  </aside>
  
  {/* Product Grid - 3 columns */}
  <section className="lg:col-span-3">
    <ProductGrid products={filteredAndSorted} />
  </section>
</div>
```

#### Filter Sidebar
- **Clear All Button**: Appears when filters are active
- **Price Checkboxes**: Multiple price range selection
- **Availability Checkboxes**: Stock and sale status filters
- **Visual Styling**: Card-based design with proper spacing

### Performance Optimization

#### Efficient Re-rendering
```typescript
const filteredAndSorted = useMemo(() => {
  // All filtering and sorting logic
}, [products, selectedCategory, sortBy, under50, between50And100, over100, inStockOnly, onSaleOnly]);
```

#### Benefits
- **Prevents Unnecessary Calculations**: Only recalculates when dependencies change
- **Smooth User Experience**: No lag when applying filters
- **Memory Efficient**: Proper cleanup of filter states

### Type Safety

#### Sort Options
```typescript
type SortOption = 'price-low' | 'price-high' | 'name' | 'rating' | '';
```

#### Product Interface Integration
- **Full Product Type Support**: Uses complete Product interface
- **Optional Field Handling**: Proper handling of optional product properties
- **Type-safe Filtering**: All filters respect TypeScript types

### Responsive Design Features

#### Mobile Optimization
- **Collapsible Filters**: Sidebar becomes mobile-friendly
- **Touch-friendly Controls**: Appropriate sizing for mobile interaction
- **Readable Typography**: Optimized text sizes for small screens

#### Desktop Enhancement
- **Sidebar Layout**: Fixed sidebar with scrollable product grid
- **Hover States**: Enhanced desktop interactions
- **Keyboard Navigation**: Full keyboard accessibility

### Integration Points

#### ProductGrid Integration
- **Filtered Data**: Passes filtered and sorted products to grid
- **State Synchronization**: Maintains filter state across interactions
- **Performance**: Efficient data flow between components

#### Database Integration
- **Product Data**: Receives products from database service
- **Dynamic Categories**: Categories generated from actual product data
- **Real-time Updates**: Reflects current product availability

### Accessibility Features

#### Screen Reader Support
- **Semantic HTML**: Proper form labels and fieldsets
- **ARIA Labels**: Clear descriptions for interactive elements
- **Focus Management**: Logical tab order through filters

#### Keyboard Navigation
- **Filter Controls**: Full keyboard accessibility
- **Clear Button**: Keyboard accessible reset functionality
- **Sort Dropdowns**: Standard select element keyboard support

### Error Handling and Edge Cases

#### Empty States
- **No Products**: Graceful handling of empty product arrays
- **No Results**: Clear messaging when filters return no results
- **Loading States**: Proper handling during data fetching

#### Filter Validation
- **Price Logic**: Proper handling of price comparisons
- **Category Validation**: Safe category filtering with dynamic data
- **State Consistency**: Prevents invalid filter combinations

### Future Enhancement Opportunities

#### Advanced Features
- **Search Integration**: Text-based product search
- **More Filter Options**: Brand, features, specifications
- **Filter Persistence**: URL parameters for shareable filtered views
- **Infinite Scroll**: Load more products dynamically

#### Analytics Integration
- **Filter Tracking**: Monitor popular filter combinations
- **User Behavior**: Track filtering patterns
- **Performance Metrics**: Filter application speed monitoring

This ProductCatalog component provides a comprehensive, production-ready product browsing experience with enterprise-level filtering capabilities and optimal user experience design.