from pydantic import BaseModel
from typing import List, Optional

class CollegeRecommendationRequest(BaseModel):
    preferred_states: List[str]
    preferred_districts: List[str]

class CollegeResponse(BaseModel):
    college_name: str
    district: str
    state: str
    available_courses: str
    facilities: str
    cutoff: float
    eligibility: str

class CollegeRecommendationResponse(BaseModel):
    colleges: List[CollegeResponse]
