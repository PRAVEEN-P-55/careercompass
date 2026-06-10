from pydantic import BaseModel
from typing import List, Optional

class ScholarshipRequest(BaseModel):
    category: Optional[str]
    gender: Optional[str]
    family_income: Optional[float]
    state: Optional[str]
    academic_score: Optional[float]

class ScholarshipResponse(BaseModel):
    scholarship_name: str
    amount: str
    eligibility: str
    deadline: str
