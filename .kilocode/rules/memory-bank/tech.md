# WhatsApp Gateway PaaS - Frontend Dashboard Technology Stack

## 🎯 Core Technologies

### Frontend Framework

- **Next.js 15.3.4**: React framework with App Router for modern development
- **React 18.3.1**: Component-based UI library with hooks and concurrent features
- **JavaScript**: Primary language (TypeScript migration planned)

### Styling & UI

- **Tailwind CSS 4.0**: Utility-first CSS framework with custom design system
- **shadcn/ui**: Comprehensive component library built on Radix UI
- **Radix UI**: Headless UI components with accessibility features
- **Framer Motion 12.19.1**: Animation library for smooth interactions

### State Management

- **React useState/useEffect**: Built-in React state management
- **Props drilling**: Current data flow pattern
- **Future**: Redux Toolkit or Zustand for complex state

## 🎯 UI Component Library

### shadcn/ui Components

- **Form Components**: Input, Label, Button, Select, Checkbox, Radio Group
- **Layout Components**: Card, Sheet, Dialog, Dropdown Menu, Tabs
- **Data Display**: Table, Badge, Progress, Alert, Avatar
- **Navigation**: Breadcrumb, Navigation Menu, Pagination
- **Feedback**: Toast (Sonner), Skeleton, Loading states

### Icons & Assets

- **Lucide React 0.523.0**: Comprehensive icon library
- **Custom SVG**: Project-specific icons in `/public/`

## 🎯 Development Setup

### Package Manager

- **npm**: Default package manager
- **package-lock.json**: Dependency lock file for consistency

### Build System

- **Next.js Build**: Optimized production builds
- **Tailwind PostCSS**: CSS processing and optimization
- **Tree Shaking**: Automatic unused code elimination

### Development Server

```bash
npm run dev     # Development server on localhost:3000
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint code quality checks
```

## 🎯 Key Dependencies

### Core Dependencies

```json
{
  "next": "15.3.4",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^12.19.1",
  "tailwindcss": "^4",
  "lucide-react": "^0.523.0"
}
```

### Authentication

- **next-auth 4.24.10**: Authentication library for Next.js
- **@auth/core**: Core authentication functionality
- **JWT**: JSON Web Token for session management

### Form Handling

- **react-hook-form 7.59.0**: Form state management and validation
- **@hookform/resolvers 5.1.1**: Validation schema resolvers
- **zod 3.25.67**: TypeScript-first schema validation
- **input-otp 1.4.2**: OTP input component

### UI Enhancement

- **class-variance-authority 0.7.1**: Component variant management
- **clsx 2.1.1**: Conditional className utility
- **tailwind-merge 3.3.1**: Tailwind class merging utility
- **cmdk 1.1.1**: Command palette component

### Data Visualization

- **recharts 3.0.2**: Chart library for analytics dashboards
- **date-fns 4.1.0**: Date manipulation and formatting

### Additional Features

- **next-themes 0.4.6**: Theme switching capability
- **sonner 2.0.5**: Toast notification system
- **vaul 1.1.2**: Drawer component for mobile
- **embla-carousel-react 8.6.0**: Carousel component

## 🎯 Technical Constraints

### Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+
- **No IE Support**: Modern JavaScript features required

### Performance Requirements

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 500KB gzipped

### Accessibility Standards

- **WCAG 2.1 AA**: Target compliance level
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: 4.5:1 minimum ratio

## 🎯 Development Patterns

### File Organization

- **App Router**: Next.js 13+ routing system
- **Component Co-location**: Components near their usage
- **Barrel Exports**: Clean import statements
- **Absolute Imports**: `@/` path mapping configured

### Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (planned)
- **Husky**: Git hooks for quality gates (planned)
- **TypeScript**: Gradual migration planned

### Animation Strategy

- **Framer Motion**: Primary animation library
- **CSS Transitions**: Simple hover effects
- **Stagger Animations**: Sequential component mounting
- **Performance**: 60fps target for all animations

## 🎯 Integration Points

### Backend API

- **REST APIs**: Primary integration method with WhatsApp Gateway API
- **Real-time Polling**: 3-second intervals for live data updates
- **QR Code Polling**: Real-time QR code generation for WhatsApp authentication
- **Authentication**: NextAuth.js with JWT token-based session management
- **WebSocket Ready**: Architecture prepared for WebSocket integration

### External Services

- **WhatsApp Business API**: Core integration via Gateway API
- **QR Code Service**: External QR code image generation (qr-server.com)
- **Analytics**: Usage tracking (planned)
- **Monitoring**: Error tracking (planned)
- **CDN**: Asset delivery optimization

## 🎯 Deployment Strategy

### Build Process

- **Static Generation**: Pre-rendered pages where possible
- **Server-Side Rendering**: Dynamic content rendering
- **API Routes**: Backend functionality in Next.js
- **Edge Functions**: Performance optimization

### Environment Configuration

- **Development**: Local development with hot reload
- **Staging**: Pre-production testing environment
- **Production**: Optimized build with CDN
- **Environment Variables**: Secure configuration management

## 🎯 Future Technology Considerations

### Planned Upgrades

- **TypeScript Migration**: Gradual conversion from JavaScript
- **State Management**: Redux Toolkit or Zustand implementation
- **Testing Framework**: Jest + React Testing Library
- **E2E Testing**: Playwright or Cypress integration
- **Performance Monitoring**: Web Vitals tracking
- **Error Tracking**: Sentry or similar service
