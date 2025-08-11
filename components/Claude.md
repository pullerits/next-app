# Claude.md - Components Directory

## Directory Overview

The `components/` directory contains reusable React components organized by feature and functionality. These components follow atomic design principles and provide consistent UI elements throughout the e-commerce application.

## Directory Structure

```
components/
├── cart/                 # Shopping cart related components
│   ├── CartButton.tsx   # Reusable button component with variants
│   └── CartItem.tsx     # Individual cart item display component
├── layout/              # Layout and navigation components
│   ├── Footer.tsx       # Site footer component
│   └── Navbar.tsx       # Site navigation component
├── products/            # Product display components
│   ├── ProductCard.tsx  # Individual product card component
│   └── ProductGrid.tsx  # Product grid layout component
├── sections/            # Homepage marketing sections
│   ├── AsSeenOnSection.tsx      # Media mentions section
│   ├── HeroSection.tsx          # Homepage hero section
│   ├── ProvenResultsSection.tsx # Results and testimonials
│   └── WhyChooseSection.tsx     # Benefits and features
└── checkout-form.tsx    # Stripe Elements payment form
```

## Component Architecture

### Design Principles
- **Atomic Design**: Components built from small, reusable pieces
- **Single Responsibility**: Each component has one clear purpose
- **Composability**: Components can be combined to create complex UIs
- **Consistency**: Uniform styling and behavior patterns

### Component Types
- **Layout Components**: Structure and navigation (Navbar, Footer)
- **UI Components**: Reusable interface elements (buttons, cards)
- **Feature Components**: Specific functionality (cart, checkout)
- **Section Components**: Page sections and content blocks

### Props and State Management
- **TypeScript Interfaces**: All components fully typed
- **Context Integration**: Components connect to global state where needed
- **Local State**: Component-specific state for UI interactions
- **Prop Drilling**: Minimal prop passing through component hierarchy

## Component Categories

### Cart Components (`cart/`)
Shopping cart functionality with consistent styling and behavior.

**CartButton** - Reusable button component
- Multiple variants (primary, secondary)
- Size options (sm, md, lg)
- Disabled states and loading indicators
- Consistent styling across application

**CartItem** - Individual cart item display
- Product information display
- Quantity controls
- Remove item functionality
- Price calculations and formatting

### Layout Components (`layout/`)
Site-wide navigation and structure components.

**Navbar** - Site navigation
- Brand/logo display
- Navigation links
- Shopping cart indicator
- Mobile responsive design

**Footer** - Site footer
- Company information
- Additional navigation links
- Legal and policy links
- Social media integration

### Product Components (`products/`)
Product display and interaction components.

**ProductCard** - Individual product display
- Product image with optimization
- Product information (name, price)
- Add to cart functionality
- Responsive card layout

**ProductGrid** - Product collection display
- Responsive grid layout
- Product card integration
- Grid customization options
- Loading and empty states

### Section Components (`sections/`)
Homepage marketing and content sections.

**HeroSection** - Homepage hero
- Large promotional content
- Call-to-action buttons
- Background images/videos
- Responsive design

**ProvenResultsSection** - Social proof
- Customer testimonials
- Success metrics
- Trust indicators
- Result demonstrations

**WhyChooseSection** - Benefits display
- Feature highlights
- Benefit explanations
- Icon integrations
- Comparison elements

**AsSeenOnSection** - Media mentions
- Logo displays
- Press coverage
- Social proof elements
- Brand credibility

### Checkout Components
Payment processing and form components.

**checkout-form.tsx** - Stripe Elements integration
- Payment form display
- Error handling
- Success/failure states
- PCI compliant payment processing

## Styling System

### Tailwind CSS Integration
- **Utility Classes**: Consistent styling with Tailwind utilities
- **Responsive Design**: Mobile-first responsive patterns
- **Custom Variants**: Component-specific styling variants
- **Dark Mode Support**: Theme-aware component styling

### Design Tokens
- **Colors**: Consistent color palette usage
- **Typography**: Standardized font sizes and weights
- **Spacing**: Uniform spacing scale
- **Shadows**: Consistent shadow patterns

### Component Variants
```typescript
// Example: Button variants
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
};
```

## State Management Integration

### Context Usage
- **CartContext**: Cart components connect to global cart state
- **Theme Context**: Layout components support theme switching
- **User Context**: Authentication-aware components

### Local State Patterns
- **Form State**: Component-level form handling
- **UI State**: Loading, error, and success states
- **Interaction State**: Hover, focus, and active states

## Performance Considerations

### Optimization Strategies
- **Component Memoization**: React.memo for expensive components
- **Image Optimization**: Next.js Image component usage
- **Code Splitting**: Dynamic imports for large components
- **Bundle Optimization**: Tree shaking and dead code elimination

### Loading Performance
- **Lazy Loading**: Non-critical components loaded on demand
- **Progressive Enhancement**: Components work without JavaScript
- **Skeleton Loading**: Loading states for better perceived performance

## Accessibility Features

### WCAG Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Clear focus indicators

### Interactive Elements
- **Button States**: Clear disabled and active states
- **Form Labels**: Proper form labeling and descriptions
- **Error Messages**: Accessible error communication
- **Skip Links**: Navigation shortcuts for assistive technology

## Testing Considerations

### Component Testing
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction testing
- **Visual Tests**: Screenshot testing for UI consistency
- **Accessibility Tests**: Automated accessibility validation

### Test Patterns
- **Props Testing**: Verify component behavior with different props
- **State Testing**: Test component state changes
- **Event Testing**: User interaction testing
- **Context Testing**: Context integration verification

## Development Guidelines

### Code Standards
- **TypeScript**: Full type safety for all components
- **ESLint**: Code quality and consistency checking
- **Prettier**: Automated code formatting
- **Component Naming**: Clear, descriptive component names

### File Organization
- **Single Responsibility**: One component per file
- **Index Files**: Organized exports from directories
- **Co-location**: Related files grouped together
- **Naming Conventions**: Consistent file and component naming

### Documentation
- **Props Documentation**: Clear prop descriptions and types
- **Usage Examples**: Example usage in component files
- **Storybook Integration**: Component story documentation
- **README Files**: Component-specific documentation

This component architecture provides a scalable, maintainable foundation for the e-commerce application with consistent design patterns and reusable functionality.