from services.rag_engine import rag_engine
from services.openrouter_client import openrouter_client

async def handle_chat(message: str) -> str:
    if not message or len(message.strip()) < 2:
        return "Please ask a question about Anujkumar's professional background."

    if not rag_engine.is_resume_related(message):
        return "I can answer only questions related to Anujkumar Yadav's professional background."

    relevant_context = rag_engine.retrieve_relevant_context(message)

    response = await openrouter_client.generate_response(message, relevant_context)

    return response
