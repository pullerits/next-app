# Claude.md - Cart Directory

## Directory Overview

The `app/cart/` directory contains the shopping cart page implementation, providing users with cart management functionality including item viewing, quantity adjustment, and checkout initiation.

## Files

```
cart/
└── page.tsx              # Shopping cart page component
```

## Cart Page (`page.tsx`)

### Purpose
Main shopping cart interface where users can view, modify, and manage their cart items before proceeding to checkout.

### Component Type
**Client Component** - Uses CartContext for state management and user interactions

### Key Features

#### Cart Display
- **Item Listing**: Displays all cart items with product information
- **Empty State**: User-friendly empty cart message with continue shopping link
- **Responsive Design**: Mobile-optimized layout with grid system

#### Item Management
- **Quantity Controls**: Increase/decrease item quantities
- **Item Removal**: Remove individual items from cart
- **Real-time Updates**: Immediate UI updates when cart changes

#### Order Summary
- **Subtotal Calculation**: Displays current cart subtotal
- **Tax Calculation**: 8% tax calculation and display
- **Total Amount**: Final total including tax
- **Free Shipping**: Shows free shipping benefit

#### Navigation
- **Checkout Button**: Proceeds to Stripe checkout when cart has items
- **Continue Shopping**: Returns to product catalog
- **Disabled States**: Checkout disabled when cart is empty

### State Management

#### CartContext Integration
```typescript
const { items, total } = useCart();
const isCartEmpty = items.length === 0;
```

#### Cart Item Structure
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

### UI Components Used

#### Layout Components
- **Promotional Banner**: "SUMMER SALE: BUY 2 GET 1 FREE"
- **Page Header**: Shopping cart title and description
- **Grid Layout**: Responsive two-column layout (items + summary)

#### Interactive Elements
- **CartItem**: Individual cart item component with controls
- **CartButton**: Styled buttons for actions (checkout, continue shopping)
- **Link Components**: Next.js Link for navigation

### Styling and Design

#### Color Scheme
- **Background**: Gray-50 for page background
- **Cards**: White background with shadow for content areas
- **Accent**: Blue gradient for header section

#### Typography
- **Headers**: Bold text hierarchy for sections
- **Pricing**: Emphasized pricing display
- **Actions**: Clear button labeling

#### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Grid System**: Tailwind CSS grid for layout
- **Sticky Elements**: Order summary sticks on desktop

### Calculations

#### Tax Calculation
```typescript
// 8% tax rate applied to subtotal
const taxAmount = total * 0.08;
const finalTotal = total * 1.08;
```

#### Display Formatting
- All prices formatted to 2 decimal places
- Currency symbol ($) displayed consistently
- Free shipping clearly indicated

### User Experience Features

#### Empty Cart State
- **Visual Feedback**: Cart icon and clear messaging
- **Call to Action**: Prominent continue shopping button
- **Navigation**: Direct link to products page

#### Populated Cart State
- **Item Overview**: Clear product information display
- **Easy Modification**: Intuitive quantity and removal controls
- **Progress Indication**: Clear path to checkout

#### Loading States
- **Smooth Transitions**: Animated updates when cart changes
- **Immediate Feedback**: Instant UI response to user actions

### Integration Points

#### CartContext
- **State Access**: Read cart items and totals
- **State Updates**: Quantity changes and item removal
- **Persistence**: Automatic localStorage synchronization

#### Navigation
- **Checkout Integration**: Seamless transition to payment flow
- **Product Catalog**: Easy return to shopping experience
- **Breadcrumb Support**: Clear navigation context

#### Stripe Integration
- **Amount Passing**: Cart total passed to checkout page
- **Tax Inclusion**: Tax calculation for payment processing

### Error Handling

#### Edge Cases
- **Empty Cart**: Graceful empty state handling
- **Invalid Items**: Protection against corrupted cart data
- **Navigation Errors**: Fallback for broken links

#### User Feedback
- **Clear Messaging**: Informative empty cart message
- **Action Guidance**: Clear next steps for users
- **Error Recovery**: Easy path back to shopping

### Performance Considerations

#### Optimization
- **Client-side Rendering**: Fast cart updates without server requests
- **Local Storage**: Instant cart persistence
- **Efficient Updates**: Minimal re-renders with proper state management

#### Loading Performance
- **Component Splitting**: Efficient code splitting
- **Image Optimization**: Next.js Image component usage
- **Minimal Dependencies**: Focused functionality