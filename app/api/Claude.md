# Claude.md - API Directory

## Directory Overview

The `app/api/` directory contains Next.js API routes that handle server-side operations for the e-commerce application. These routes provide secure backend functionality, particularly for payment processing with Stripe.

## Files and Structure

```
api/
└── create-payment-intent/
    └── route.ts           # Stripe Payment Intent creation endpoint
```

## API Routes

### Create Payment Intent (`create-payment-intent/route.ts`)

**Purpose**: Server-side Stripe Payment Intent creation for secure payment processing

**HTTP Method**: POST

**Request Body**:
```typescript
{
  amount: number;      // Payment amount in dollars
  currency?: string;   // Currency code (defaults to 'usd')
}
```

**Response**:
```typescript
{
  client_secret: string;  // Stripe Payment Intent client secret
}
```

**Features**:
- **Amount Validation**: Ensures positive payment amounts
- **Currency Support**: Configurable currency (defaults to USD)
- **Stripe Integration**: Uses Stripe SDK with server-side secret key
- **Amount Formatting**: Converts dollars to cents for Stripe API
- **Error Handling**: Comprehensive error responses
- **Automatic Payment Methods**: Enables all available payment methods

**Security**:
- Server-side only execution
- Uses `STRIPE_SECRET_KEY` environment variable
- Input validation and sanitization
- Proper error handling without exposing sensitive data

**Dependencies**:
- `stripe` - Official Stripe Node.js SDK
- `@/lib/stripe` - Custom utility functions for amount formatting
- Next.js `NextRequest` and `NextResponse` for request handling

**Code Structure**:
```typescript
// Stripe client initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

// POST request handler
export async function POST(req: NextRequest) {
  // Request body parsing
  // Amount validation
  // Payment Intent creation
  // Response formatting
  // Error handling
}
```

**Error Responses**:
- `400 Bad Request`: Invalid amount or request data
- `500 Internal Server Error`: Stripe API errors or server issues

**Integration Points**:
- **Client Integration**: Called from checkout page (`app/checkout/page.tsx`)
- **Stripe Elements**: Client secret used to initialize payment form
- **Cart Integration**: Amount calculated from cart total with tax

## Environment Variables

Required environment variables for API functionality:

- `STRIPE_SECRET_KEY`: Stripe secret key for server-side operations
- `STRIPE_WEBHOOK_SECRET`: For future webhook implementation (not currently used)

## Usage Flow

1. **Client Request**: Checkout page calculates total amount and sends POST request
2. **Server Processing**: API route validates amount and creates Stripe Payment Intent
3. **Stripe Communication**: Server communicates with Stripe API using secret key
4. **Client Response**: API returns client secret for payment form initialization
5. **Payment Completion**: Client uses secret to complete payment via Stripe Elements

## Error Handling Strategy

### Input Validation
- Amount must be greater than 0
- Currency must be valid ISO code
- Request body must be valid JSON

### Stripe API Errors
- Network errors caught and logged
- Invalid API key errors handled
- Rate limiting considerations

### Response Formatting
- Consistent error response structure
- No sensitive information exposure
- Proper HTTP status codes

## Future Enhancements

### Planned API Endpoints
- **Webhook Handler**: For payment confirmation and order processing
- **Product Management**: CRUD operations for products
- **Order Management**: Order creation and tracking
- **User Management**: Customer accounts and profiles

### Security Enhancements
- **Rate Limiting**: Prevent API abuse
- **Authentication**: User-based payment processing
- **Webhook Verification**: Secure webhook handling
- **Request Logging**: Audit trail for payments

## Testing Considerations

### Test Environment
- Use Stripe test keys for development
- Test card numbers for payment simulation
- Error scenario testing

### Test Cases
- Valid payment intent creation
- Invalid amount handling
- Missing environment variables
- Stripe API error simulation
- Network failure handling

## Performance Notes

- **Minimal Processing**: Fast payment intent creation
- **Error Caching**: Avoid repeated Stripe API calls on errors
- **Connection Pooling**: Efficient Stripe client usage
- **Response Size**: Minimal response payload