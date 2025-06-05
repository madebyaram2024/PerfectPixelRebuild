# PerfectPixel AI - Professional Web Development Platform

A comprehensive web platform for digital services with advanced content management capabilities, focusing on flexible admin tools for blog and portfolio management with integrated Stripe payment processing.

## Features

### Core Platform
- **React.js Frontend** with responsive design and modern UI components
- **Express.js Backend** with scalable architecture
- **PostgreSQL Database** for robust data management
- **Stripe Payment Integration** for secure service payments
- **Google Analytics** integration for tracking and insights

### Content Management System
- **Advanced Blog Editor** with live preview and SEO optimization
- **Automated Content Distribution** to multiple channels (website, newsletter, social media)
- **Portfolio Management** with featured project showcasing
- **Client Portal** for project tracking and communication
- **Admin Dashboard** with comprehensive CRUD operations

### Payment Processing
- **Service Packages**: Website Redesign ($149.99), New Website Build ($199.99), Hosting ($24.99/mo)
- **Secure Stripe Integration** with checkout flow
- **Payment Success Tracking** with Google Analytics events
- **Client Project Creation** upon successful payment

### SEO & Analytics
- **SEO Audit Tools** with comprehensive website analysis
- **Keyword Tracking** and position monitoring
- **Meta Tag Optimization** for all content
- **Google Analytics** integration with custom event tracking

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=your_postgresql_connection_string
PGDATABASE=your_database_name
PGHOST=your_database_host
PGPASSWORD=your_database_password
PGPORT=your_database_port
PGUSER=your_database_user

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Session Security
SESSION_SECRET=your_secure_session_secret
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd perfectpixel-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
- Connect your GitHub repository to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`
- Add environment variables in Netlify dashboard

### Environment Setup

Ensure all environment variables are configured in your deployment platform:

- **Database**: PostgreSQL connection string
- **Stripe**: API keys for payment processing
- **Analytics**: Google Analytics measurement ID
- **Security**: Session secret for authentication

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── public/                # Static assets
```

## API Endpoints

### Public APIs
- `GET /api/projects` - Get featured projects
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog-posts` - Get published blog posts
- `POST /api/contact` - Submit contact form

### Admin APIs
- `GET /api/admin/*` - Admin dashboard data
- `POST /api/admin/*` - Create content
- `PUT /api/admin/*` - Update content
- `DELETE /api/admin/*` - Delete content

### Payment APIs
- `POST /api/create-payment-intent` - Create Stripe payment
- `POST /api/webhook` - Stripe webhook handler

### Client Portal APIs
- `POST /api/client/login` - Client authentication
- `GET /api/client/projects` - Client project data

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Stripe
- **Analytics**: Google Analytics 4
- **Deployment**: Netlify
- **Development**: Vite, ESBuild

## License

MIT License - see LICENSE file for details

## Support

For support, email support@perfectpixelai.com or visit our contact page.