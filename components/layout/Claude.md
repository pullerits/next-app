# Claude.md - Layout Components Directory

## Directory Overview

The `components/layout/` directory contains site-wide layout components that provide consistent navigation, branding, and structure across all pages of the e-commerce application.

## Files

```
layout/
├── Footer.tsx           # Site footer with links and information
└── Navbar.tsx           # Site navigation and header
```

## Navbar Component (`Navbar.tsx`)

### Purpose
Primary site navigation component providing brand identity, navigation links, shopping cart access, and responsive mobile navigation.

### Component Type
**Client Component** - Interactive navigation with cart integration

### Key Features

#### Brand Identity
- **Logo Display**: Company logo and brand name
- **Brand Link**: Clickable brand element linking to homepage
- **Consistent Branding**: Maintains brand identity across pages

#### Navigation Links
- **Primary Navigation**: Main site sections and pages
- **Active States**: Visual indication of current page
- **Responsive Menu**: Mobile-optimized navigation menu
- **Dropdown Support**: Expandable navigation sections

#### Shopping Cart Integration
- **Cart Icon**: Visual shopping cart indicator
- **Item Count**: Real-time display of cart item quantity
- **Cart Access**: Direct link to shopping cart page
- **Context Integration**: Connected to CartContext for live updates

#### Mobile Responsiveness
- **Hamburger Menu**: Collapsible mobile navigation
- **Touch-Friendly**: Optimized for mobile interaction
- **Responsive Breakpoints**: Adaptive layout for different screen sizes

### Context Integration

#### CartContext Usage
```typescript
const { itemCount } = useCart();
```

#### Real-time Updates
- **Cart Count**: Live updating cart item count
- **State Synchronization**: Automatic updates when cart changes
- **Cross-page Consistency**: Maintains cart state across navigation

### UI Structure

#### Desktop Layout
```typescript
<nav className="bg-white shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Brand */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-xl font-bold">
          Brand Name
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          {/* Navigation items */}
        </div>
      </div>
      
      {/* Cart & Actions */}
      <div className="flex items-center space-x-4">
        <Link href="/cart" className="relative">
          <ShoppingCartIcon />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  </div>
</nav>
```

#### Mobile Layout
- **Collapsible Menu**: Expandable navigation for mobile devices
- **Touch Targets**: Appropriately sized touch targets
- **Overlay Menu**: Full-screen mobile navigation overlay

### Styling System

#### Color Scheme
- **Background**: Clean white background with shadow
- **Text Colors**: High contrast text for readability
- **Accent Colors**: Brand colors for active and hover states
- **Cart Badge**: Red notification badge for cart count

#### Typography
- **Brand Text**: Large, bold brand name
- **Navigation Text**: Clear, readable navigation links
- **Cart Count**: Small, prominent cart count display

#### Interactive States
- **Hover Effects**: Subtle hover animations
- **Active States**: Visual indication of current page
- **Focus States**: Keyboard navigation support

### Responsive Design

#### Breakpoint Strategy
- **Mobile First**: Optimized for mobile devices
- **Tablet Layout**: Medium screen adaptations
- **Desktop Layout**: Full navigation display

#### Mobile Menu
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Mobile menu toggle
<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="md:hidden"
>
  <MenuIcon />
</button>
```

## Footer Component (`Footer.tsx`)

### Purpose
Site footer providing additional navigation, company information, legal links, and social media connections.

### Component Type
**Server Component** - Static footer content

### Key Features

#### Company Information
- **About Section**: Company description and mission
- **Contact Information**: Address, phone, email details
- **Business Hours**: Operating hours and availability
- **Social Media Links**: Links to social media profiles

#### Additional Navigation
- **Secondary Links**: Support, policies, help pages
- **Site Map**: Comprehensive site navigation
- **Category Links**: Product category navigation
- **Quick Links**: Frequently accessed pages

#### Legal and Compliance
- **Privacy Policy**: Link to privacy policy
- **Terms of Service**: Terms and conditions link
- **Cookie Policy**: Cookie usage information
- **Accessibility Statement**: Accessibility compliance information

#### Newsletter and Engagement
- **Newsletter Signup**: Email subscription form
- **Social Media**: Social platform links and widgets
- **Customer Reviews**: Link to review platforms
- **Blog Links**: Company blog and content

### UI Structure

#### Multi-Column Layout
```typescript
<footer className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Company Info Column */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Name</h3>
        <p className="text-gray-300 mb-4">
          Company description and mission statement.
        </p>
      </div>
      
      {/* Quick Links Column */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          {/* Navigation links */}
        </ul>
      </div>
      
      {/* Customer Service Column */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
        <ul className="space-y-2">
          {/* Support links */}
        </ul>
      </div>
      
      {/* Contact Column */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        {/* Contact information */}
      </div>
    </div>
  </div>
  
  {/* Copyright Section */}
  <div className="border-t border-gray-800 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">
          © 2024 Company Name. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {/* Legal links */}
        </div>
      </div>
    </div>
  </div>
</footer>
```

### Styling System

#### Color Scheme
- **Background**: Dark gray (gray-900) for contrast
- **Text**: White and light gray for readability
- **Links**: Hover effects with color transitions
- **Borders**: Subtle borders for section separation

#### Typography
- **Headings**: Clear section headings
- **Body Text**: Readable footer content
- **Links**: Distinct styling for clickable elements
- **Copyright**: Smaller, muted copyright text

### Responsive Design

#### Grid Layout
- **Mobile**: Single column layout
- **Tablet**: Two-column layout
- **Desktop**: Four-column layout

#### Content Organization
- **Priority Content**: Most important information first
- **Logical Grouping**: Related links grouped together
- **Scannable Structure**: Easy to scan and navigate

### SEO and Accessibility

#### SEO Features
- **Structured Data**: Proper schema markup for company information
- **Internal Linking**: Strategic internal links for SEO
- **Contact Information**: Structured contact details
- **Social Signals**: Social media link integration

#### Accessibility Features
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper heading structure and labels
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators

### Integration Points

#### Site Navigation
- **Consistent Links**: Matches main navigation structure
- **Additional Pages**: Links to pages not in main navigation
- **Cross-linking**: Strategic internal link structure

#### Marketing Integration
- **Newsletter Signup**: Email marketing integration
- **Social Media**: Social platform connections
- **Analytics**: Tracking for footer link performance

### Performance Considerations

#### Loading Optimization
- **Static Content**: Server-side rendering for fast loading
- **Image Optimization**: Optimized social media icons
- **Minimal JavaScript**: Static content with minimal interactivity

#### Maintenance
- **Centralized Links**: Easy to update navigation links
- **Modular Structure**: Easy to add or remove sections
- **Content Management**: Structured for easy content updates