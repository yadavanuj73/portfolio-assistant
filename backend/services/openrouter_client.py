import os
import httpx
from typing import Optional

class OpenRouterClient:
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY", "")
        self.base_url = "https://openrouter.ai/api/v1/chat/completions"
        self.model = "mistralai/mistral-7b-instruct:free"

    async def generate_response(self, prompt: str, context: str) -> str:
        if not self.api_key:
            return self._fallback_response(prompt, context)

        system_message = f"""You are an AI assistant that answers questions about Anujkumar Yadav's professional background.

STRICT RULES:
1. ONLY answer questions using the provided resume context
2. If the question is not related to the resume, respond with: "I can answer only questions related to Anujkumar Yadav's professional background."
3. Be conversational but stay factual
4. Do not make up information
5. Keep responses concise and relevant

RESUME CONTEXT:
{context}
"""

        messages = [
            {"role": "system", "content": system_message},
            {"role": "user", "content": prompt}
        ]

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.base_url,
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model,
                        "messages": messages,
                        "max_tokens": 500,
                        "temperature": 0.7
                    }
                )

                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    return self._fallback_response(prompt, context)

        except Exception as e:
            print(f"OpenRouter API error: {e}")
            return self._fallback_response(prompt, context)

    def _fallback_response(self, prompt: str, context: str) -> str:
        prompt_lower = prompt.lower()

        if any(word in prompt_lower for word in ['skill', 'technology', 'know', 'language']):
            return """Anujkumar has expertise in:
- **Programming**: Python
- **Frameworks**: Django, Flask, FastAPI
- **Databases**: MySQL, SQLAlchemy
- **Frontend**: HTML5, CSS3, JavaScript
- **Tools**: Git, GitHub, REST APIs

He specializes in backend development and building scalable database-driven applications."""

        elif any(word in prompt_lower for word in ['project', 'built', 'developed', 'work']):
            return """Anujkumar has built two notable projects:

1. **AI Powered Email Assistant**: A Chrome extension using Spring Boot that generates intelligent, context-aware email replies directly in Gmail.

2. **Student Performance Tracker**: A Django-based web application for managing student academic data with optimized database queries and complete CRUD operations."""

        elif any(word in prompt_lower for word in ['education', 'degree', 'study', 'university', 'college', 'cgpa']):
            return """Anujkumar is pursuing a B.E. in Computer Science from Visvesvaraya Technological University (VTU), with an expected graduation in 2026. He has maintained a CGPA of 7.6."""

        elif any(word in prompt_lower for word in ['location', 'where', 'based', 'live']):
            return """Anujkumar is based in Bengaluru, Karnataka."""

        elif any(word in prompt_lower for word in ['who', 'about', 'introduce', 'tell me']):
            return """Anujkumar Yadav is a motivated Python developer based in Bengaluru, specializing in backend development, REST APIs, and scalable database-driven applications. He's currently pursuing B.E. in Computer Science from VTU with a CGPA of 7.6."""

        elif any(word in prompt_lower for word in ['experience', 'background', 'career']):
            return """Anujkumar has experience in backend development with a focus on Python frameworks like Django, Flask, and FastAPI. He has built production applications including an AI-powered email assistant and a student performance tracking system, demonstrating expertise in REST APIs, database optimization, and full-stack development."""

        else:
            if context:
                return f"Based on the resume:\n\n{context[:500]}..."
            return "I can answer only questions related to Anujkumar Yadav's professional background."

openrouter_client = OpenRouterClient()
