import os
from typing import List
import numpy as np
from sentence_transformers import SentenceTransformer
import re

class RAGEngine:
    def __init__(self, resume_path: str):
        self.resume_path = resume_path
        self.chunks = []
        self.embeddings = None
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self._load_and_process_resume()

    def _load_and_process_resume(self):
        with open(self.resume_path, 'r', encoding='utf-8') as f:
            content = f.read()

        self.chunks = self._chunk_text(content)
        self.embeddings = self.model.encode(self.chunks)

    def _chunk_text(self, text: str, chunk_size: int = 300) -> List[str]:
        paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]

        chunks = []
        current_chunk = ""

        for para in paragraphs:
            if len(current_chunk) + len(para) < chunk_size:
                current_chunk += para + "\n\n"
            else:
                if current_chunk:
                    chunks.append(current_chunk.strip())
                current_chunk = para + "\n\n"

        if current_chunk:
            chunks.append(current_chunk.strip())

        return chunks if chunks else [text]

    def retrieve_relevant_context(self, query: str, top_k: int = 3) -> str:
        query_embedding = self.model.encode([query])[0]

        similarities = np.dot(self.embeddings, query_embedding)
        top_indices = np.argsort(similarities)[-top_k:][::-1]

        relevant_chunks = [self.chunks[i] for i in top_indices]
        return "\n\n".join(relevant_chunks)

    def is_resume_related(self, query: str) -> bool:
        resume_keywords = [
            'anujkumar', 'yadav', 'skill', 'project', 'experience',
            'education', 'work', 'developer', 'python', 'django',
            'flask', 'fastapi', 'mysql', 'qualification', 'cgpa',
            'vtu', 'bengaluru', 'backend', 'api', 'database',
            'email assistant', 'student performance', 'tracker'
        ]

        query_lower = query.lower()

        question_words = ['what', 'where', 'who', 'how', 'when', 'which', 'tell', 'describe', 'explain']
        has_question_word = any(word in query_lower for word in question_words)

        has_resume_keyword = any(keyword in query_lower for keyword in resume_keywords)

        return has_question_word or has_resume_keyword or len(query.split()) > 3

resume_file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'resume.txt')
rag_engine = RAGEngine(resume_file_path)
