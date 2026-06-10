import pandas as pd
import numpy as np

# We'll use a rule-based weighted score approach mimicking ML behavior since actual model training data isn't provided.
# A real ML approach would involve training a Random Forest or XGBoost on historical student data.

COURSE_MAPPINGS = {
    "Science": ["B.Tech AI & DS", "B.E. Computer Science", "B.Sc Computer Science", "B.Sc Physics"],
    "Commerce": ["B.Com", "BBA", "B.A. Economics"],
    "Arts": ["B.A. English", "B.A. History"]
}

SUBJECT_TO_COURSE = {
    "Physics": ["B.Tech AI & DS", "B.E. Computer Science", "B.Sc Physics"],
    "Mathematics": ["B.Tech AI & DS", "B.E. Computer Science", "B.Sc Computer Science", "B.Sc Mathematics"],
    "Accountancy": ["B.Com", "BBA"],
    "English": ["B.A. English", "BBA"]
}

def calculate_course_recommendations(marks: dict, favorite_subjects: list, stream: str, assessment_scores: dict):
    recommendations = []
    
    # Extract overall average mark for Academic Score calculation
    if marks:
        academic_base = sum(marks.values()) / len(marks)
    else:
        academic_base = 60 # fallback

    available_courses = COURSE_MAPPINGS.get(stream, COURSE_MAPPINGS["Arts"] + COURSE_MAPPINGS["Commerce"])

    for course in available_courses:
        # 1. Eligibility Score (20%)
        # Base eligibility based on stream match
        eligibility_score = 100 if course in COURSE_MAPPINGS.get(stream, []) else 50
        
        # 2. Academic Score (40%)
        # If the course matches a favorite subject, boost the academic score slightly
        course_academic = academic_base
        for subject in favorite_subjects:
            if course in SUBJECT_TO_COURSE.get(subject, []):
                course_academic = min(100, course_academic + 10)
        
        # 3. Interest Score (40%)
        # Map course to assessment domains roughly
        interest_score = 50 # Default
        if "B.Tech" in course or "B.E." in course or "Computer" in course:
            interest_score = assessment_scores.get('technology_score', 50)
        elif "Physics" in course or "Science" in course:
            interest_score = assessment_scores.get('science_score', 50)
        elif "Com" in course or "BBA" in course:
            interest_score = max(assessment_scores.get('commerce_score', 50), assessment_scores.get('management_score', 50))
        elif "B.A." in course:
            interest_score = assessment_scores.get('arts_score', 50)

        # Weighted calculation
        final_score = (0.40 * interest_score) + (0.40 * course_academic) + (0.20 * eligibility_score)
        
        recommendations.append({
            "course": course,
            "score": round(final_score, 2)
        })

    # Sort by score descending
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations
