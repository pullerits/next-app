# Claude.md - Contexts Directory

## Directory Overview

The `contexts/` directory contains React Context providers for global state management across the application. These contexts provide centralized state management for features that need to be accessed by multiple components throughout the component tree.

## Files

```
contexts/
└── CartContext.tsx      # Shopping cart state management context
```

## CartContext (`CartContext.tsx`)

### Purpose
Global shopping cart state management using React Context API, providing cart functionality across the entire application with persistent storage and real-time updates.

### Context Type
**Client-side Context** - Requires 'use client' directive for state management

### Key Features

#### State Management
- **Global Cart State**: Centralized cart data accessible throughout app
- **Real-time Updates**: Immediate UI updates when cart changes
- **Persistent Storage**: localStorage integration for cart persistence
- **State Synchronization**: Consistent cart state across components

#### Cart Operations
- **Add Items**: Add products to cart with quantity management
- **Remove Items**: Remove individual items from cart
- **Update Quantities**: Modify item quantities with validation
- **Clear Cart**: Empty entire cart functionality
- **Item Count**: Real-time cart item count calculation

#### Data Persistence
- **localStorage Integration**: Automatic cart data persistence
- **Session Recovery**: Cart data restored on page reload
- **Cross-tab Synchronization**: Potential for multi-tab cart sync
- **Error Handling**: Graceful handling of storage errors

### Type Definitions

#### CartItem Interface
```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

#### Cart State Interface
```typescript
interface CartState {
  items: CartItem[];
  total: number;
}
```

#### Context Type Interface
```typescript
interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}
```

### State Management Implementation

#### Reducer Pattern
```typescript
type CartAction = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, total };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, total };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, total };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    
    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: action.payload, total };
    }
    
    default:
      return state;
  }
};
```

### Provider Implementation

#### Context Provider
```typescript
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Action creators
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
```

### Hook Implementation

#### useCart Hook
```typescript
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
```

### Persistence Strategy

#### localStorage Integration
- **Automatic Saving**: Cart saved to localStorage on every change
- **Automatic Loading**: Cart restored from localStorage on app load
- **Error Handling**: Graceful handling of localStorage failures
- **Data Validation**: JSON parsing error handling

#### Storage Implementation
```typescript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(state.items));
}, [state.items]);

// Load from localStorage
useEffect(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const cartItems = JSON.parse(savedCart);
      dispatch({ type: 'LOAD_CART', payload: cartItems });
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }
}, []);
```

### Usage Examples

#### Provider Setup
```typescript
// In app/layout.tsx
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
```

#### Component Usage
```typescript
// In any component
import { useCart } from '@/contexts/CartContext';

function ProductCard({ product }) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };
  
  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

#### Cart Display
```typescript
// In cart component
function Cart() {
  const { items, total, removeItem, updateQuantity } = useCart();
  
  return (
    <div>
      {items.map(item => (
        <CartItem 
          key={item.id}
          item={item}
          onRemove={removeItem}
          onUpdateQuantity={updateQuantity}
        />
      ))}
      <div>Total: ${total.toFixed(2)}</div>
    </div>
  );
}
```

### Performance Considerations

#### Optimization Strategies
- **Selective Re-renders**: Components only re-render when relevant cart data changes
- **Memoization**: Action creators wrapped to prevent unnecessary re-renders
- **Efficient Updates**: Reducer pattern for predictable state updates
- **Minimal Dependencies**: Lightweight context implementation

#### Memory Management
- **State Structure**: Efficient cart item structure
- **localStorage Limits**: Consideration for storage size limits
- **Cleanup**: Proper cleanup on unmount (handled by React)
- **Error Boundaries**: Protection against context errors

### Error Handling

#### Runtime Errors
- **localStorage Errors**: Graceful handling of storage failures
- **JSON Parsing**: Safe parsing of stored cart data
- **Invalid Operations**: Validation of cart operations
- **Network Issues**: Resilient to network failures

#### Development Errors
- **Context Usage**: Clear error messages for improper hook usage
- **Type Safety**: TypeScript validation for cart operations
- **Debugging**: Console logging for development debugging

### Integration Points

#### Component Integration
- **Cart Components**: Direct integration with cart UI components
- **Product Components**: Add to cart functionality
- **Navigation**: Cart count display in navigation
- **Checkout**: Cart data for payment processing

#### Layout Integration
- **Provider Placement**: High-level provider placement in layout
- **Global Access**: Available throughout component tree
- **State Persistence**: Maintains state across page navigation

### Future Enhancements

#### Potential Features
- **User Authentication**: Link cart to user accounts
- **Multi-device Sync**: Synchronize cart across devices
- **Cart Expiration**: Automatic cart cleanup after inactivity
- **Analytics**: Track cart behavior and abandonment

#### Scalability
- **Database Integration**: Move from localStorage to database
- **API Integration**: Server-side cart management
- **Real-time Updates**: WebSocket integration for live updates
- **Performance Monitoring**: Cart operation performance tracking