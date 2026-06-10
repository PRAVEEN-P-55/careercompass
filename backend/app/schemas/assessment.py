from pydantic import BaseModel
from typing import List

class AssessmentSubmission(BaseModel):
    user_id: int
    answers: List[int] # Expecting an array of 20 integers representing answers

class AssessmentResponse(BaseModel):
    science_score: float
    commerce_score: float
    arts_score: float
    technology_score: float
    management_score: float
