# Claude.md - Cart Components Directory

## Directory Overview

The `components/cart/` directory contains reusable components specifically designed for shopping cart functionality, providing consistent cart-related UI elements throughout the application.

## Files

```
cart/
├── CartButton.tsx       # Reusable button component with multiple variants
└── CartItem.tsx         # Individual cart item display and management
```

## CartButton Component (`CartButton.tsx`)

### Purpose
Reusable button component with consistent styling, multiple variants, and states for cart-related actions throughout the application.

### Component Type
**Client Component** - Interactive button with click handlers

### Props Interface
```typescript
interface CartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### Key Features

#### Variant System
```typescript
const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300"
};
```

#### Size Options
```typescript
const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm", 
  lg: "px-6 py-3 text-base"
};
```

#### State Management
- **Disabled State**: Visual and functional disabled state
- **Hover Effects**: Interactive hover styling
- **Focus States**: Keyboard accessibility focus indicators
- **Loading States**: Support for loading indicators

### Styling System

#### Base Classes
```typescript
const baseClasses = "font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
```

#### Dynamic Class Composition
```typescript
className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
```

### Usage Examples

#### Primary Button (Default)
```typescript
<CartButton onClick={handleClick}>
  Add to Cart
</CartButton>
```

#### Secondary Button
```typescript
<CartButton onClick={handleClick} variant="secondary">
  Continue Shopping
</CartButton>
```

#### Small Button with Custom Class
```typescript
<CartButton 
  onClick={handleClick} 
  size="sm" 
  className="w-full"
>
  Update Quantity
</CartButton>
```

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper button semantics
- **Focus Indicators**: Clear focus visualization
- **Disabled State**: Proper disabled state communication

## CartItem Component (`CartItem.tsx`)

### Purpose
Individual cart item display component with quantity controls, item information, and removal functionality.

### Component Type
**Client Component** - Uses CartContext for state management

### Props Interface
```typescript
interface CartItemProps {
  item: CartItem;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

### Key Features

#### Item Display
- **Product Image**: Optimized image display with Next.js Image
- **Product Information**: Name, price, and quantity details
- **Price Calculation**: Individual and total price display
- **Responsive Layout**: Mobile-optimized item layout

#### Quantity Controls
```typescript
<CartButton
  onClick={() => updateQuantity(id, quantity - 1)}
  variant="secondary"
  size="sm"
  disabled={quantity <= 1}
>
  -
</CartButton>

<span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
  {quantity}
</span>

<CartButton
  onClick={() => updateQuantity(id, quantity + 1)}
  variant="secondary"
  size="sm"
>
  +
</CartButton>
```

#### Item Management
- **Quantity Updates**: Increase/decrease item quantities
- **Item Removal**: Remove items from cart
- **Real-time Updates**: Immediate UI updates with cart context
- **Price Recalculation**: Automatic price updates

### Context Integration

#### CartContext Usage
```typescript
const { updateQuantity, removeItem } = useCart();
```

#### State Updates
- **Quantity Changes**: Direct cart context updates
- **Item Removal**: Removes item from global cart state
- **Persistence**: Automatic localStorage synchronization

### UI Structure

#### Layout Components
```typescript
<div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
  {/* Product Image */}
  <div className="flex-shrink-0">
    <Link href={`/products/${id}`}>
      <Image src={image} alt={name} width={80} height={80} />
    </Link>
  </div>
  
  {/* Product Information */}
  <div className="flex-1 min-w-0">
    <h3>{name}</h3>
    <p>${price.toFixed(2)} each</p>
  </div>
  
  {/* Quantity Controls */}
  <div className="flex items-center space-x-2">
    {/* Quantity buttons and display */}
  </div>
  
  {/* Total Price */}
  <div className="text-sm font-medium">
    ${(price * quantity).toFixed(2)}
  </div>
  
  {/* Remove Button */}
  <CartButton onClick={() => removeItem(id)}>
    Remove
  </CartButton>
</div>
```

### Responsive Design

#### Mobile Optimization
- **Touch-friendly Buttons**: Appropriate button sizes for mobile
- **Flexible Layout**: Adapts to different screen sizes
- **Readable Text**: Optimal font sizes for mobile devices
- **Spacing**: Consistent spacing across devices

#### Desktop Experience
- **Hover Effects**: Enhanced desktop interactions
- **Larger Click Targets**: Optimized for mouse interaction
- **Grid Layout**: Efficient use of desktop screen space

### Price Formatting

#### Consistent Formatting
```typescript
// Individual price
${price.toFixed(2)} each

// Total price
${(price * quantity).toFixed(2)}
```

#### Currency Display
- **Dollar Symbol**: Consistent currency symbol usage
- **Decimal Places**: Always shows 2 decimal places
- **Number Formatting**: Proper number formatting for currency

### Integration Points

#### Product Navigation
- **Product Links**: Links to individual product pages
- **Image Navigation**: Clickable product images
- **Breadcrumb Integration**: Supports site navigation patterns

#### Cart Synchronization
- **State Updates**: Real-time cart state synchronization
- **Storage Persistence**: Automatic localStorage updates
- **UI Consistency**: Maintains cart count in navigation

### Error Handling

#### Edge Cases
- **Invalid Quantities**: Prevents negative or zero quantities
- **Missing Images**: Fallback to placeholder images
- **Network Errors**: Graceful handling of update failures

#### User Feedback
- **Loading States**: Visual feedback during updates
- **Error Messages**: Clear error communication
- **Success Indicators**: Confirmation of successful actions

### Performance Considerations

#### Optimization
- **Efficient Updates**: Minimal re-renders with proper state management
- **Image Optimization**: Next.js Image component for performance
- **Component Memoization**: Prevents unnecessary re-renders

#### Loading Performance
- **Lazy Loading**: Images loaded as needed
- **Efficient State**: Optimized cart state structure
- **Minimal Dependencies**: Focused component functionality