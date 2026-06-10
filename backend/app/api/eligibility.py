from fastapi import APIRouter, Depends
from app.api.dependencies import get_current_user
from app.models.models import User
from app.schemas.eligibility import CourseEligibilityRequest, CourseEligibilityResponse
import pandas as pd
import os

router = APIRouter()

COURSE_DF = None

def load_course_data():
    global COURSE_DF
    file_path = os.path.join(os.path.dirname(__file__), "../../datasets/courses.xlsx")
    if os.path.exists(file_path):
        COURSE_DF = pd.read_excel(file_path)
    else:
        COURSE_DF = pd.DataFrame(columns=[
            'Course Name', 'Stream Required', 'Required Subjects', 'Minimum Marks'
        ])

@router.post("/eligibility", response_model=CourseEligibilityResponse)
def check_eligibility(
    request: CourseEligibilityRequest,
    current_user: User = Depends(get_current_user)
):
    if COURSE_DF is None:
        load_course_data()
        
    if COURSE_DF.empty:
        return CourseEligibilityResponse(eligible_courses=[], recommended_courses=[])

    eligible = []
    recommended = []

    for _, row in COURSE_DF.iterrows():
        min_marks = float(row['Minimum Marks'])
        stream_req = str(row['Stream Required'])
        
        # Check eligibility
        if request.marks >= min_marks and (stream_req == 'Any' or request.stream in stream_req):
            eligible.append(row['Course Name'])
            
            # If marks are comfortably above min marks, recommend
            if request.marks >= min_marks + 10:
                recommended.append(row['Course Name'])

    return CourseEligibilityResponse(
        eligible_courses=eligible,
        recommended_courses=recommended
    )
