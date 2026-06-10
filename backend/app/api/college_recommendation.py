from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import CollegeRecommendation, User
from app.schemas.college import CollegeRecommendationRequest, CollegeRecommendationResponse, CollegeResponse
from app.api.dependencies import get_current_user
import pandas as pd
import os

router = APIRouter()

# Global variable to cache the dataset
COLLEGE_DF = None

def load_college_data():
    global COLLEGE_DF
    # Check if the mock dataset exists, otherwise use an empty dataframe or fallback
    file_path = os.path.join(os.path.dirname(__file__), "../../datasets/colleges.xlsx")
    if os.path.exists(file_path):
        COLLEGE_DF = pd.read_excel(file_path)
    else:
        COLLEGE_DF = pd.DataFrame(columns=[
            'College Name', 'District', 'State', 'Available Courses', 
            'Facilities', 'Cutoff', 'Eligibility'
        ])

@router.post("/colleges", response_model=CollegeRecommendationResponse)
def recommend_colleges(
    request: CollegeRecommendationRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if COLLEGE_DF is None:
        load_college_data()

    if COLLEGE_DF.empty:
        return CollegeRecommendationResponse(colleges=[])

    # Filter based on preferences
    filtered_df = COLLEGE_DF.copy()
    
    if request.preferred_states:
        filtered_df = filtered_df[filtered_df['State'].isin(request.preferred_states)]
    
    if request.preferred_districts:
        filtered_df = filtered_df[filtered_df['District'].isin(request.preferred_districts)]

    # Rank them by Cutoff descending just as an example logic
    filtered_df = filtered_df.sort_values(by='Cutoff', ascending=False)

    # Convert to list of dicts
    colleges = []
    for _, row in filtered_df.iterrows():
        college_data = {
            "college_name": str(row['College Name']),
            "district": str(row['District']),
            "state": str(row['State']),
            "available_courses": str(row['Available Courses']),
            "facilities": str(row['Facilities']),
            "cutoff": float(row['Cutoff']),
            "eligibility": str(row['Eligibility'])
        }
        colleges.append(CollegeResponse(**college_data))

        # Optionally save history to db
        db_rec = CollegeRecommendation(
            user_id=current_user.id,
            **college_data
        )
        db.add(db_rec)
    
    db.commit()

    return CollegeRecommendationResponse(colleges=colleges)
