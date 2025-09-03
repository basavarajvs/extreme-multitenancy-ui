# Extreme WMS Landing Page

This is a standalone landing page for Extreme WMS, built with React, Vite, and Ant Design.

## Project Structure

```
apps/landing/
├── src/
│   ├── components/     # React components
│   ├── assets/        # Static assets
│   ├── styles/        # Global styles and theme
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── config/        # Configuration files
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── public/            # Public assets
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   cd apps/landing
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
VITE_API_URL=http://your-api-url
VITE_SAAS_LOGIN_URL=http://your-saas-app-url/login
VITE_SAAS_REGISTER_URL=http://your-saas-app-url/register
```

## Deployment

This application can be deployed independently from the main SaaS application. It's recommended to use a CDN for optimal performance.

### Build and Deploy

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service.

## Development Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Write tests for new features
- Keep components small and focused
- Use Ant Design components when possible
- Follow the established styling patterns

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
