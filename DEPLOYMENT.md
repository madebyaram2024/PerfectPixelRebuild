# Deployment Guide - PerfectPixel AI

## Pre-deployment Checklist

### 1. Environment Variables Setup
Ensure all required environment variables are configured:

**Database (PostgreSQL)**
- `DATABASE_URL` - Full PostgreSQL connection string
- `PGDATABASE` - Database name
- `PGHOST` - Database host
- `PGPASSWORD` - Database password
- `PGPORT` - Database port (usually 5432)
- `PGUSER` - Database username

**Stripe Payment Processing**
- `STRIPE_SECRET_KEY` - Your Stripe secret key (sk_...)
- `VITE_STRIPE_PUBLIC_KEY` - Your Stripe publishable key (pk_...)

**Analytics & Tracking**
- `VITE_GA_MEASUREMENT_ID` - Google Analytics measurement ID (G-...)

**Security**
- `SESSION_SECRET` - Secure random string for session encryption

### 2. Database Setup
```bash
npm run db:push
```

### 3. Build Verification
```bash
npm run build
```

## GitHub Deployment

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: PerfectPixel AI platform with comprehensive blog editing and Stripe payment integration"
```

### 2. Create GitHub Repository
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 3. Repository Setup
- Create repository on GitHub
- Add environment variables as GitHub Secrets
- Configure branch protection rules

## Netlify Deployment

### 1. Connect Repository
- Log into Netlify
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository

### 2. Build Configuration
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### 3. Environment Variables
Add all environment variables in Netlify dashboard:
- Site Settings → Environment variables
- Add each variable from your `.env` file

### 4. Domain Configuration
- Configure custom domain if needed
- Enable HTTPS (automatic with Netlify)
- Set up redirects for SPA routing (handled by netlify.toml)

### 5. Database Connection
- Ensure your PostgreSQL database is accessible from Netlify
- Use a cloud database service (Neon, Supabase, or Railway)
- Update `DATABASE_URL` with production connection string

## Production Testing

### 1. Payment Integration Test
```bash
# Test payment endpoint
curl -X POST https://your-site.netlify.app/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 14999, "packageId": "redesign", "packageName": "Website Redesign"}'
```

### 2. Blog System Test
- Navigate to `/admin/blog/new`
- Create a test blog post
- Verify automated distribution features
- Test content publishing

### 3. Client Portal Test
- Test client login functionality
- Verify project tracking features
- Check payment processing flow

## Post-Deployment Configuration

### 1. Stripe Webhook Setup
- Add webhook endpoint: `https://your-site.netlify.app/api/webhook`
- Configure webhook events: `payment_intent.succeeded`
- Update `STRIPE_WEBHOOK_SECRET` if using webhook verification

### 2. Google Analytics
- Verify analytics tracking is working
- Set up goals and conversions
- Configure e-commerce tracking for payments

### 3. SEO Configuration
- Submit sitemap to Google Search Console
- Configure meta tags for all pages
- Set up structured data markup

## Monitoring & Maintenance

### 1. Performance Monitoring
- Monitor Netlify function execution times
- Track database query performance
- Monitor payment processing success rates

### 2. Error Tracking
- Set up error monitoring (Sentry recommended)
- Monitor failed payment attempts
- Track blog publishing errors

### 3. Backup Strategy
- Regular database backups
- Content export capabilities
- Environment configuration backup

## Security Considerations

### 1. API Security
- All sensitive operations require authentication
- Payment processing uses secure Stripe integration
- Database queries use parameterized statements

### 2. Environment Security
- Never commit `.env` files
- Use different keys for development/production
- Regularly rotate session secrets

### 3. Content Security
- Admin dashboard requires authentication
- Client portal uses secure access codes
- Blog content is sanitized before storage

## Support & Troubleshooting

### Common Issues
1. **Payment failures**: Check Stripe key configuration
2. **Database connection**: Verify PostgreSQL accessibility
3. **Build errors**: Ensure all dependencies are installed
4. **Blog editor issues**: Check TypeScript compilation
5. **Analytics not tracking**: Verify GA measurement ID

### Support Contacts
- Technical issues: Check GitHub Issues
- Payment issues: Verify Stripe dashboard
- Deployment issues: Check Netlify build logs