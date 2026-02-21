# Quick Start Guide

Get your portfolio running in 5 minutes!

## Step 1: Backend Setup (2 minutes)

Open a terminal and run:

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies (this takes ~1-2 minutes)
pip install -r requirements.txt

# Start the backend server
python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Keep this terminal running!**

## Step 2: Frontend Setup (1 minute)

Open a **new terminal** in the project root and run:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

You should see:
```
  VITE v5.4.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

## Step 3: Open in Browser

Visit: **http://localhost:5173**

You should see the portfolio website!

## Step 4: Test the AI Assistant

1. Click the **"Talk to My AI Assistant"** button
2. Type a question like: `What skills does Anujkumar have?`
3. Press Enter or click Send
4. The AI should respond with information from the resume!

## Troubleshooting

### Backend won't start?

**Error**: `ModuleNotFoundError: No module named 'fastapi'`
- **Fix**: Make sure you activated the virtual environment and ran `pip install -r requirements.txt`

**Error**: `Address already in use`
- **Fix**: Port 8000 is already taken. Kill the process or change the port in `main.py`

### Frontend won't start?

**Error**: `Cannot find module`
- **Fix**: Run `npm install` first

### Chat not working?

**Error**: "Sorry, I couldn't connect to the backend"
- **Fix**: Make sure the backend is running on port 8000
- Check that both terminals are still active

### Still having issues?

1. Make sure you have Python 3.10+ installed: `python --version`
2. Make sure you have Node.js 18+ installed: `node --version`
3. Check that ports 8000 and 5173 are not in use
4. Try restarting both servers

## What's Next?

### Customize the Portfolio

Edit these files:
- `src/App.tsx` - Change personal info, projects, skills
- `backend/data/resume.txt` - Update resume content
- `src/components/ChatInterface.tsx` - Customize chat UI

### Add Your Own Content

1. Update the resume in `backend/data/resume.txt`
2. Update personal info in `src/App.tsx`
3. Change social media links
4. Add your own projects

### Get an OpenRouter API Key (Optional)

The chatbot works without an API key using intelligent fallback responses.

But if you want to use the actual AI model:

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up for a free account
3. Get your API key
4. Create `backend/.env` file:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```
5. Restart the backend server

### Deploy to Production

See `DEPLOYMENT.md` for detailed deployment instructions!

## Project Structure

```
.
├── backend/              # Python FastAPI backend
│   ├── api/             # API routes
│   ├── services/        # RAG engine & AI client
│   ├── data/            # Resume data
│   └── main.py          # Entry point
│
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── App.tsx          # Main portfolio page
│   └── main.tsx         # Entry point
│
├── README.md            # Full documentation
├── QUICKSTART.md        # This file
└── DEPLOYMENT.md        # Deployment guide
```

## Key Features

- **Modern Portfolio**: Clean design with smooth animations
- **AI Chatbot**: RAG-based assistant that answers questions from your resume
- **No Hallucinations**: AI only answers from provided resume data
- **Production Ready**: Clean architecture, proper error handling
- **Easy to Deploy**: Multiple deployment options included

## Development Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code
```

### Backend
```bash
python main.py   # Start server
```

## Need Help?

Check these files:
- `README.md` - Complete documentation
- `DEPLOYMENT.md` - Deployment instructions
- `backend/services/rag_engine.py` - RAG implementation
- `backend/services/openrouter_client.py` - AI integration

---

Happy coding! 🚀
