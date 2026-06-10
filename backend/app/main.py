from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.api import auth, assessment, course_recommendation, college_recommendation, eligibility, roadmap, scholarship, dashboard, chat

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EduPath AI Backend",
    description="Backend APIs for EduPath AI - A Personalized Career & Education Advisor",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(assessment.router, prefix="/assessment", tags=["Assessment Engine"])
app.include_router(course_recommendation.router, prefix="/recommend", tags=["Course Recommendation"])
app.include_router(college_recommendation.router, prefix="/recommend", tags=["College Recommendation"])
app.include_router(eligibility.router, prefix="/course", tags=["Course Eligibility"])
app.include_router(roadmap.router, tags=["Career Mapping"])
app.include_router(scholarship.router, prefix="/recommend", tags=["Scholarships"])
app.include_router(dashboard.router, tags=["Dashboard Analytics"])
app.include_router(chat.router, tags=["AI Counselor"])

@app.get("/")
def read_root():
    return {"message": "Welcome to EduPath AI API"}
