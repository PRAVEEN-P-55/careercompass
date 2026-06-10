from pydantic import BaseModel
from typing import List, Dict, Optional

class CourseRecommendationRequest(BaseModel):
    user_id: int
    marks: Dict[str, float] # e.g. {"physics": 92, "chemistry": 88, "mathematics": 95}
    favorite_subjects: List[str]
    stream: str # e.g. "Science"

class CourseScore(BaseModel):
    course: str
    score: float

class CourseRecommendationResponse(BaseModel):
    recommendations: List[CourseScore]
