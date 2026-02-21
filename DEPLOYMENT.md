# Deployment Guide

This guide will help you deploy your portfolio website publicly.

## Prerequisites

- Git repository (GitHub, GitLab, etc.)
- Both backend and frontend code ready

## Option 1: Deploy with Render (Recommended)

### Backend Deployment on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure the service:
   - **Name**: `portfolio-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `backend`
   - **Plan**: Free

5. Add environment variables (optional):
   - `OPENROUTER_API_KEY`: Your OpenRouter API key

6. Click "Create Web Service"
7. Wait for deployment (this takes a few minutes on first deploy)
8. Copy your backend URL (e.g., `https://portfolio-backend.onrender.com`)

### Frontend Deployment on Render

1. Click "New +" → "Static Site"
2. Connect your Git repository
3. Configure the site:
   - **Name**: `portfolio-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. Before deploying, update the API URL:
   - In `src/components/ChatInterface.tsx`
   - Change `http://localhost:8000` to your Render backend URL
   - Commit and push the change

5. Click "Create Static Site"
6. Your portfolio will be live at `https://portfolio-frontend.onrender.com`

**Note**: Free tier services on Render spin down after inactivity. First request may take 30-60 seconds.

## Option 2: Deploy with Vercel + Render

### Backend: Use Render (same as above)

### Frontend: Use Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (keep as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add environment variables:
   - `VITE_API_URL`: Your Render backend URL

6. Update `src/components/ChatInterface.tsx`:
```typescript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const response = await fetch(`${apiUrl}/chat`, {
  // ... rest of the code
});
```

7. Click "Deploy"

## Option 3: Cloudflare Tunnel (Local to Public)

Perfect for testing or temporary deployment:

### 1. Install Cloudflare Tunnel

```bash
# macOS
brew install cloudflare/cloudflare/cloudflared

# Windows
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### 2. Start Backend Server

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```

Backend runs on `http://localhost:8000`

### 3. Start Frontend Server

Open a new terminal:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Create Public Tunnel

Open another terminal:

```bash
cloudflared tunnel --url http://localhost:5173
```

You'll get a public URL like: `https://random-words.trycloudflare.com`

**Important**: The frontend can connect to localhost:8000 but external users can't. For full functionality with external users, you need to also tunnel the backend:

```bash
# In another terminal
cloudflared tunnel --url http://localhost:8000
```

Then update the frontend's API URL to use the backend tunnel URL.

## Option 4: Railway

### Backend on Railway

1. Go to [Railway](https://railway.app/)
2. Create new project from GitHub repo
3. Add the backend service:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: Add `OPENROUTER_API_KEY` if needed

4. Railway will auto-detect Python and install dependencies
5. Get your backend URL from Railway dashboard

### Frontend on Railway

1. Add a new service to the same project
2. Configure:
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`

3. Update the API URL in your code to point to the Railway backend

## Environment Variables Summary

### Backend (.env)
```
OPENROUTER_API_KEY=your_key_here  # Optional - works without it
```

### Frontend
Update in `src/components/ChatInterface.tsx`:
```typescript
const apiUrl = 'YOUR_BACKEND_URL';  // e.g., https://portfolio-backend.onrender.com
```

## CORS Configuration

If you see CORS errors, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-frontend-domain.com",  # Add your frontend domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing Your Deployment

1. Visit your frontend URL
2. Click "Talk to My AI Assistant"
3. Ask a question like "What skills does Anujkumar have?"
4. Verify you get a response

If the chatbot says it can't connect:
- Check if backend is running
- Verify the API URL is correct in the frontend code
- Check browser console for CORS errors
- Ensure both services are deployed and running

## Monitoring

### Render
- Check logs in the Render dashboard
- Free tier spins down after inactivity
- First request may be slow

### Vercel
- Automatically scales
- Check deployment logs in Vercel dashboard
- Edge functions available for premium plans

### Railway
- Check logs in Railway dashboard
- Free tier has usage limits
- Great for hobby projects

## Cost Considerations

All options listed have generous free tiers:

- **Render**: 750 hours/month free (enough for 1 service 24/7)
- **Vercel**: Unlimited static site hosting
- **Railway**: $5 free credit per month
- **Cloudflare Tunnel**: Completely free

**Recommendation**: Start with Render (backend) + Vercel (frontend) for the best free deployment experience.

## Troubleshooting

### Backend not responding
- Check if the backend service is running
- Verify the PORT environment variable is set correctly
- Check backend logs for errors

### Frontend can't connect to backend
- Verify the API URL in ChatInterface.tsx
- Check CORS settings in backend/main.py
- Ensure both services are deployed

### Slow initial load
- Free tiers often "spin down" after inactivity
- First request may take 30-60 seconds
- Consider upgrading to paid tier for always-on services

### OpenRouter API errors
- The app works without an API key using fallback responses
- Verify your API key is set correctly if using OpenRouter
- Check OpenRouter dashboard for usage limits

## Next Steps

1. Custom domain: Add a custom domain in your hosting provider's dashboard
2. Analytics: Add Google Analytics or Plausible
3. SEO: Update meta tags in `index.html`
4. Performance: Enable caching and compression
5. Monitoring: Set up uptime monitoring with UptimeRobot

Happy deploying!
