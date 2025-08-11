# Claude.md - Checkout Directory

## Directory Overview

The `app/checkout/` directory contains the secure payment processing interface using Stripe Elements for handling customer payments in the e-commerce application.

## Files

```
checkout/
└── page.tsx              # Stripe checkout page component
```

## Checkout Page (`page.tsx`)

### Purpose
Secure payment processing page that integrates with Stripe Elements to handle customer payments, order summary display, and payment confirmation.

### Component Type
**Client Component** - Requires Stripe Elements and cart state interaction

### Key Features

#### Payment Integration
- **Stripe Elements**: Pre-built payment form components
- **Payment Intents**: Secure server-side payment processing
- **Error Handling**: Comprehensive payment error management
- **Success Routing**: Automatic redirect to confirmation page

#### Order Summary
- **Cart Total Display**: Current cart subtotal
- **Tax Calculation**: 8% tax applied to subtotal
- **Final Amount**: Total amount to be charged
- **Item Validation**: Ensures cart is not empty before payment

#### User Experience
- **Loading States**: Payment processing indicators
- **Error Messages**: Clear payment error communication
- **Empty Cart Handling**: Redirects empty cart users to shopping

### Dependencies

#### External Libraries
```typescript
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
```

#### Internal Dependencies
```typescript
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout-form';
```

### State Management

#### Cart Integration
```typescript
const { total, items } = useCart();
const finalAmount = total * 1.08; // Including 8% tax
```

#### Payment State
```typescript
const [clientSecret, setClientSecret] = useState('');
```

### Payment Flow

#### 1. Page Load
- Check if cart has items
- Calculate final amount with tax
- Create Stripe Payment Intent via API

#### 2. Payment Intent Creation
```typescript
useEffect(() => {
  if (total > 0) {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: finalAmount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.client_secret));
  }
}, [finalAmount, total]);
```

#### 3. Stripe Elements Initialization
```typescript
const appearance = {
  theme: 'stripe' as const,
};

const options = {
  clientSecret,
  appearance,
};
```

#### 4. Payment Form Rendering
- CheckoutForm component with Stripe Elements
- Payment confirmation handling
- Error state management

### UI Components

#### Empty Cart State
- **User Message**: "Your cart is empty"
- **Action Button**: Continue Shopping link
- **Navigation**: Redirect to products page

#### Checkout Interface
- **Page Header**: "Checkout" title
- **Order Summary Card**: Itemized cost breakdown
- **Payment Form**: Stripe Elements integration
- **Responsive Design**: Mobile-optimized layout

#### Order Summary Display
```typescript
<div className="space-y-2 text-sm">
  <div className="flex justify-between">
    <span>Subtotal:</span>
    <span>${total.toFixed(2)}</span>
  </div>
  <div className="flex justify-between">
    <span>Tax (8%):</span>
    <span>${(total * 0.08).toFixed(2)}</span>
  </div>
  <div className="flex justify-between font-semibold text-lg border-t pt-2">
    <span>Total:</span>
    <span>${finalAmount.toFixed(2)}</span>
  </div>
</div>
```

### Security Features

#### Payment Security
- **Server-side Processing**: Payment Intents created server-side
- **Client Secret**: Secure token for payment completion
- **Stripe Compliance**: PCI-compliant payment handling
- **Error Isolation**: Payment errors don't expose sensitive data

#### Data Validation
- **Amount Verification**: Server-side amount validation
- **Cart Verification**: Ensures cart is not empty
- **Payment Intent Validation**: Validates client secret before form rendering

### Error Handling

#### Payment Errors
- Stripe payment errors displayed to user
- Network errors handled gracefully
- Invalid payment methods rejected

#### Cart Errors
- Empty cart state handled with redirect
- Invalid cart data protection
- Cart state synchronization

#### API Errors
- Payment Intent creation failures
- Server communication errors
- Fallback error messages

### Styling and Design

#### Layout Structure
- **Maximum Width**: 2xl container for optimal reading
- **Padding**: Consistent spacing throughout
- **Grid System**: Organized content sections

#### Visual Hierarchy
- **Headers**: Clear section titles
- **Summary Box**: Highlighted order information
- **Form Styling**: Consistent with Stripe design system

#### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Flexible Layout**: Adapts to different screen sizes
- **Touch Friendly**: Large buttons and form elements

### Integration Points

#### Stripe Integration
- **Elements Provider**: Wraps payment form
- **Client Secret**: Connects to Payment Intent
- **Appearance Theme**: Consistent styling with app

#### Cart Integration
- **State Access**: Reads cart totals and items
- **Validation**: Ensures cart has items
- **Calculation**: Applies tax to cart total

#### Navigation Integration
- **Success Redirect**: Handled by CheckoutForm component
- **Shopping Link**: Returns to product catalog
- **Error Handling**: Keeps user on checkout page

### Performance Considerations

#### Loading Optimization
- **Conditional Rendering**: Payment form only renders when ready
- **Client Secret Caching**: Prevents unnecessary API calls
- **Component Splitting**: Efficient code organization

#### User Experience
- **Progressive Loading**: Shows order summary while payment form loads
- **Immediate Feedback**: Loading states for all interactions
- **Error Recovery**: Clear path forward from errors