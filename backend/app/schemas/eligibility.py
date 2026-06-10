from pydantic import BaseModel
from typing import List

class CourseEligibilityRequest(BaseModel):
    marks: float
    stream: str

class CourseEligibilityResponse(BaseModel):
    eligible_courses: List[str]
    recommended_courses: List[str]
