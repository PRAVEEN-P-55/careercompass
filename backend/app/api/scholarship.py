from fastapi import APIRouter, Depends
from app.api.dependencies import get_current_user
from app.models.models import User
from app.schemas.scholarship import ScholarshipRequest, ScholarshipResponse
from typing import List
import pandas as pd
import os

router = APIRouter()

SCHOLARSHIP_DF = None

def load_scholarship_data():
    global SCHOLARSHIP_DF
    file_path = os.path.join(os.path.dirname(__file__), "../../datasets/Scholarship.xlsx")
    if os.path.exists(file_path):
        SCHOLARSHIP_DF = pd.read_excel(file_path)
    else:
        SCHOLARSHIP_DF = pd.DataFrame(columns=[
            'Scholarship Name', 'Amount', 'Category', 'Gender', 'Max Family Income', 'Min Academic Score', 'State', 'Deadline'
        ])

@router.post("/scholarships", response_model=List[ScholarshipResponse])
def recommend_scholarships(
    request: ScholarshipRequest,
    current_user: User = Depends(get_current_user)
):
    if SCHOLARSHIP_DF is None:
        load_scholarship_data()

    if SCHOLARSHIP_DF.empty:
        return []

    filtered_df = SCHOLARSHIP_DF.copy()

    # Filter based on user profile if provided
    if request.category:
        filtered_df = filtered_df[(filtered_df['Category'] == 'All') | (filtered_df['Category'] == request.category)]
    
    if request.gender:
        filtered_df = filtered_df[(filtered_df['Gender'] == 'All') | (filtered_df['Gender'] == request.gender)]

    if request.family_income is not None:
        filtered_df = filtered_df[filtered_df['Max Family Income'] >= request.family_income]

    if request.academic_score is not None:
        filtered_df = filtered_df[filtered_df['Min Academic Score'] <= request.academic_score]

    if request.state:
        filtered_df = filtered_df[(filtered_df['State'] == 'All') | (filtered_df['State'] == request.state)]

    results = []
    for _, row in filtered_df.iterrows():
        results.append(ScholarshipResponse(
            scholarship_name=str(row['Scholarship Name']),
            amount=str(row['Amount']),
            eligibility=f"Min {row['Min Academic Score']}% Score, Income < {row['Max Family Income']}",
            deadline=str(row['Deadline'])
        ))

    return results
