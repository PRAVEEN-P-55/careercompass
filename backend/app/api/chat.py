from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.api.dependencies import get_current_user
from app.models.models import User
import os

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
def ai_chat(request: ChatRequest, current_user: User = Depends(get_current_user)):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or not genai:
        # Fallback if Gemini isn't configured
        return ChatResponse(response="I'm sorry, my AI backend is not configured with an API key yet. Please try again later.")

    try:
        client = genai.Client(api_key=api_key)
        
        system_instruction = "You are an expert career and education counselor for Indian students. Answer their questions clearly, keep it under 3 paragraphs, and be encouraging."

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=request.message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            ),
        )
        
        return ChatResponse(response=response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Service error: {str(e)}")
