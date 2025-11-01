# Luxio Market - Troubleshooting Guide

## Table of Contents
- [Common Issues](#common-issues)
- [Development Issues](#development-issues)
- [Deployment Issues](#deployment-issues)
- [Database Issues](#database-issues)
- [Authentication Issues](#authentication-issues)
- [Performance Issues](#performance-issues)

## Common Issues

### "Failed to fetch" Error

**Symptom**: Browser console shows "Failed to fetch" or 401 errors

**Causes & Solutions**:

1. **Backend not running**
   ```bash
   # Check if backend is running on port 3001
   curl http://localhost:3001/api/health
   
   # If not running, start it:
   npm run dev
   ```

2. **CORS configuration**
   - Verify `FRONTEND_URL` in backend environment matches your frontend URL
   - Check CORS settings in `server/index-render.ts`

3. **Credentials not included**
   - Ensure `credentials: 'include'` is set in frontend fetch requests
   - Check cookie settings allow cross-origin

### Port Already in Use

**Symptom**: Error `EADDRINUSE: address already in use`

**Solution**:
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
lsof -ti:5000 | xargs kill -9

# For port 3001
lsof -ti:3001 | xargs kill -9
```

### Missing Environment Variables

**Symptom**: Warnings about undefined env variables

**Solution**:
1. Create `.env.development` file in project root
2. Add all required variables (see SETUP.md)
3. Restart development server

---

## Development Issues

### Hot Reload Not Working

**Solution**:
1. Check if Vite dev server is running
2. Clear browser cache (Ctrl/Cmd + Shift + R)
3. Restart development server:
   ```bash
   npm run dev
   ```

### Webpack/Vite Build Errors

**Common fixes**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Rebuild
npm run build
```

### TypeScript Errors

**Solution**:
```bash
# Run type checking
npm run check

# Fix common issues
# - Check import paths
# - Verify types are installed (@types/...)
# - Clear TypeScript cache (restart IDE)
```

---

## Deployment Issues

### Vercel Deployment Fails

**Common causes**:

1. **Build errors**
   - Check Vercel build logs
   - Test build locally: `npm run build`
   - Fix any TypeScript or build errors

2. **Wrong build settings**
   - Framework Preset: Vite
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`

3. **Missing environment variables**
   - Add all `VITE_*` variables in Vercel dashboard
   - Redeploy after adding variables

### Render Deployment Fails

**Common causes**:

1. **Build command issues**
   - Check build logs in Render dashboard
   - Verify `start:backend` command is correct

2. **Port binding**
   - Ensure backend listens on `process.env.PORT || 3001`
   - Render provides PORT environment variable

3. **Database connection**
   - Verify `MONGODB_URI` is set correctly
   - Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)

### SSL/HTTPS Issues

**Solution**:
- Wait 24-48 hours for SSL provisioning
- Check domain DNS records are correct
- Ensure CNAME records point to correct targets

---

## Database Issues

### MongoDB Connection Failed

**Solutions**:

1. **Check connection string**
   ```bash
   # Test connection
   mongosh "your_connection_string"
   ```

2. **IP Whitelist**
   - Go to MongoDB Atlas → Network Access
   - Add your IP or 0.0.0.0/0 for development

3. **Database user permissions**
   - Verify user has read/write permissions
   - Check password is correct (no special characters issues)

### Data Not Persisting

**Check**:
1. MongoDB connection is stable
2. No errors in server logs
3. Correct database name is being used
4. User has write permissions

### Seeding Products Fails

**Solutions**:
```bash
# Check MongoDB connection first
npm run seed:products

# If fails, check:
# - MONGODB_URI is set
# - Database is accessible
# - Seed data file exists: utils/seed-products.ts
```

---

## Authentication Issues

### Login Not Working

**Checklist**:
1. ✓ User exists in database
2. ✓ Password is correct
3. ✓ Email is verified (if required)
4. ✓ Session store is working
5. ✓ Cookies are being set

**Debug steps**:
```bash
# Check if user exists
# Use MongoDB Compass or mongo shell

# Check server logs for errors
# Look for authentication errors

# Test with curl:
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Session Expires Too Quickly

**Solution**:
- Adjust session maxAge in backend
- Check session store configuration
- Verify cookie settings (httpOnly, secure, sameSite)

### Email Verification Not Working

**Check**:
1. SendGrid API key is valid
2. Sender email is verified in SendGrid
3. Check spam folder
4. Verify email sending code has no errors

---

## Performance Issues

### Slow Page Load

**Solutions**:

1. **Enable production build**
   ```bash
   npm run build
   npm start
   ```

2. **Check image sizes**
   - Use WebP format
   - Implement lazy loading
   - Use proper image dimensions

3. **Optimize bundle size**
   - Run build analysis
   - Remove unused dependencies
   - Code split large pages

### Database Queries Slow

**Solutions**:
1. Add indexes to frequently queried fields
2. Limit query results (pagination)
3. Use MongoDB aggregation pipelines
4. Cache frequently accessed data

### High Memory Usage

**Check**:
```bash
# Monitor memory
node --max-old-space-size=512 server/index.ts

# Profile memory usage
node --inspect server/index.ts
```

---

## Error Messages Reference

### "CSRF token mismatch"

**Cause**: CSRF protection is rejecting the request

**Solution**:
- Ensure CSRF token is included in requests
- Check CORS configuration
- Verify frontend and backend URLs match

### "Rate limit exceeded"

**Cause**: Too many requests from same IP

**Solution**:
- Wait for rate limit window to reset (15 minutes)
- In development, increase rate limit in code
- In production, ensure legitimate traffic patterns

### "JWT token invalid"

**Cause**: Token expired or malformed

**Solution**:
- Log out and log back in
- Clear cookies
- Check JWT_SECRET matches between requests

---

## Getting Help

If you're still experiencing issues:

1. **Check existing documentation**:
   - [Setup Guide](./SETUP.md)
   - [Deployment Guide](./DEPLOYMENT.md)
   - [API Documentation](./API.md)

2. **Check logs**:
   - Browser console (F12)
   - Server logs (terminal)
   - Vercel/Render deployment logs

3. **Enable debug mode**:
   ```env
   DEBUG=*
   LOG_LEVEL=debug
   ```

4. **Contact support**:
   - Open an issue on GitHub
   - Check community forums
   - Contact development team

## Diagnostic Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Test API health
curl http://localhost:3001/api/health

# Run SEO analysis
npm run analyze:seo

# Check TypeScript
npm run check

# View MongoDB connection
mongosh "$MONGODB_URI"
```

## Reset Everything

If all else fails, complete reset:

```bash
# Stop all processes
pkill -f node

# Remove dependencies
rm -rf node_modules frontend/node_modules
rm package-lock.json frontend/package-lock.json

# Reinstall
npm install

# Clear caches
rm -rf frontend/node_modules/.vite
rm -rf .next

# Restart
npm run dev
```
