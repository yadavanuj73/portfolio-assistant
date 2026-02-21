# Anujkumar Yadav - Portfolio Website with AI Assistant

A production-quality personal portfolio website featuring an integrated AI chatbot that answers questions based on resume data using Retrieval Augmented Generation (RAG).

## Features

- **Modern Portfolio UI**: Clean, hand-crafted design with sections for About, Skills, Projects, and Contact
- **AI Resume Assistant**: RAG-based chatbot that answers questions strictly from resume data
- **Smooth Animations**: Subtle micro-interactions using Framer Motion
- **Python Backend**: FastAPI with async architecture
- **RAG Implementation**: Uses sentence transformers for semantic search and retrieval
- **OpenRouter Integration**: AI responses powered by Mistral-7B (free model)

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS (custom styling)
- Framer Motion
- Lucide React (icons)

### Backend
- Python 3.10+
- FastAPI
- Sentence Transformers (all-MiniLM-L6-v2)
- OpenRouter API
- Uvicorn (ASGI server)

## Project Structure

```
.
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   └── chat.py              # Chat endpoint handler
│   ├── services/
│   │   ├── __init__.py
│   │   ├── rag_engine.py        # RAG implementation
│   │   └── openrouter_client.py # OpenRouter API client
│   ├── data/
│   │   └── resume.txt           # Resume knowledge base
│   ├── main.py                  # FastAPI app
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment variables template
├── src/
│   ├── components/
│   │   └── ChatInterface.tsx    # Chat UI component
│   ├── App.tsx                  # Main portfolio page
│   ├── main.tsx
│   └── index.css
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- pip

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (optional - works without API key using fallback):
```bash
cp .env.example .env
```

5. (Optional) Add your OpenRouter API key to `.env`:
```
OPENROUTER_API_KEY=your_api_key_here
```

**Note**: The application works without an API key using intelligent fallback responses!

6. Start the backend server:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Open a new terminal in the project root directory

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

1. Visit `http://localhost:5173` in your browser
2. Explore the portfolio sections (Hero, About, Skills, Projects)
3. Click "Talk to My AI Assistant" to open the chat interface
4. Ask questions about Anujkumar's skills, projects, or experience
5. The AI will respond based on the resume data

## Example Questions

- "What skills does Anujkumar have?"
- "Tell me about his projects"
- "What is his educational background?"
- "Where is he based?"
- "What frameworks does he know?"

## RAG Implementation Details

The chatbot uses a sophisticated RAG pipeline:

1. **Chunking**: Resume text is split into semantic chunks
2. **Embedding**: Chunks are embedded using sentence-transformers
3. **Retrieval**: User queries are embedded and matched against resume chunks
4. **Generation**: Relevant context is sent to OpenRouter's Mistral-7B model
5. **Grounding**: Model is instructed to answer only from provided context

### Fallback System

If the OpenRouter API is unavailable or no API key is provided, the system uses an intelligent fallback that:
- Pattern matches common question types
- Returns accurate information from the resume
- Maintains the same quality of responses

## Deployment

### Option 1: Cloudflare Tunnel (Recommended)

1. Install Cloudflare Tunnel:
```bash
npm install -g cloudflared
```

2. Start both servers (backend on 8000, frontend on 5173)

3. Create a tunnel:
```bash
cloudflared tunnel --url http://localhost:5173
```

### Option 2: Render

1. Create a new Web Service for the backend
2. Create a new Static Site for the frontend
3. Set environment variables in Render dashboard
4. Deploy both services

### Environment Variables for Production

Backend:
- `OPENROUTER_API_KEY` (optional)

Frontend:
- Update the API URL in `ChatInterface.tsx` to your backend URL

## Development

### Build for Production

Frontend:
```bash
npm run build
```

Backend:
The Python backend doesn't require building. Simply run:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Security Notes

- The chatbot only answers questions about resume content
- Unrelated queries receive a polite rejection
- No user data is stored
- API keys are kept in environment variables

## Customization

To customize for your own portfolio:

1. Update resume data in `backend/data/resume.txt`
2. Modify personal information in `src/App.tsx`
3. Adjust colors in component files (currently using emerald theme)
4. Update social media links

## License

MIT License - Feel free to use this as a template for your own portfolio!

## Author

**Anujkumar Yadav**
- Location: Bengaluru, Karnataka
- Role: Python Developer
- Education: B.E. Computer Science, VTU (2022-2026)

---

Built with care using modern web technologies and AI.
