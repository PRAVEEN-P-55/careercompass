from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import AssessmentResult
from app.schemas.assessment import AssessmentSubmission, AssessmentResponse
from app.models.models import User
from app.api.dependencies import get_current_user

router = APIRouter()

# 20 predefined questions mapped to domains
# Assuming each answer is a score from 1-5
# Question index mapped to domain
# 0-3: Science, 4-7: Commerce, 8-11: Arts, 12-15: Tech, 16-19: Management
DOMAIN_MAPPING = {
    "science": [0, 1, 2, 3],
    "commerce": [4, 5, 6, 7],
    "arts": [8, 9, 10, 11],
    "technology": [12, 13, 14, 15],
    "management": [16, 17, 18, 19]
}

@router.post("/submit", response_model=AssessmentResponse)
def submit_assessment(
    submission: AssessmentSubmission, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if len(submission.answers) != 20:
        raise HTTPException(status_code=400, detail="Must submit exactly 20 answers")
    
    if current_user.id != submission.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to submit for this user")

    scores = {
        "science": 0,
        "commerce": 0,
        "arts": 0,
        "technology": 0,
        "management": 0
    }

    # Calculate percentage scores (assuming max 5 per question -> max 20 per domain -> * 5 = 100)
    for domain, indices in DOMAIN_MAPPING.items():
        domain_total = sum(submission.answers[i] for i in indices)
        scores[domain] = (domain_total / 20.0) * 100

    # Save to database
    assessment_result = AssessmentResult(
        user_id=submission.user_id,
        science_score=scores["science"],
        commerce_score=scores["commerce"],
        arts_score=scores["arts"],
        technology_score=scores["technology"],
        management_score=scores["management"]
    )
    db.add(assessment_result)
    db.commit()
    db.refresh(assessment_result)

    return AssessmentResponse(
        science_score=assessment_result.science_score,
        commerce_score=assessment_result.commerce_score,
        arts_score=assessment_result.arts_score,
        technology_score=assessment_result.technology_score,
        management_score=assessment_result.management_score
    )
