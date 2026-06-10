from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import CourseRecommendation, AssessmentResult, User
from app.schemas.recommendation import CourseRecommendationRequest, CourseRecommendationResponse, CourseScore
from app.api.dependencies import get_current_user
from app.ml.course_recommender import calculate_course_recommendations

router = APIRouter()

@router.post("/course", response_model=CourseRecommendationResponse)
def recommend_course(
    request: CourseRecommendationRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.id != request.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to request for this user")

    # Fetch latest assessment result for this user
    assessment = db.query(AssessmentResult).filter(AssessmentResult.user_id == request.user_id).order_by(AssessmentResult.created_at.desc()).first()
    
    assessment_scores = {}
    if assessment:
        assessment_scores = {
            "science_score": assessment.science_score,
            "commerce_score": assessment.commerce_score,
            "arts_score": assessment.arts_score,
            "technology_score": assessment.technology_score,
            "management_score": assessment.management_score,
        }
    else:
        # Default fallback if assessment not taken
        assessment_scores = {"science_score": 50, "commerce_score": 50, "arts_score": 50, "technology_score": 50, "management_score": 50}

    recs = calculate_course_recommendations(
        marks=request.marks,
        favorite_subjects=request.favorite_subjects,
        stream=request.stream,
        assessment_scores=assessment_scores
    )

    # Save recommendations to database
    for rec in recs:
        db_rec = CourseRecommendation(
            user_id=request.user_id,
            course=rec["course"],
            score=rec["score"]
        )
        db.add(db_rec)
    db.commit()

    return CourseRecommendationResponse(
        recommendations=[CourseScore(**r) for r in recs]
    )
