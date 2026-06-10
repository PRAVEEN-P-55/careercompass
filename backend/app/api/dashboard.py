from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import User, AssessmentResult, CourseRecommendation, CollegeRecommendation

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_analytics(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_assessments = db.query(AssessmentResult).count()
    
    return {
        "total_users": total_users,
        "total_assessments": total_assessments,
        "top_recommended_courses": ["B.Tech AI & DS", "B.Sc Computer Science", "B.Com"], # Example mock analytics
        "top_selected_colleges": ["Government Engineering College", "National Institute of Science"],
        "scholarship_applications": 124
    }
