from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    state = Column(String)
    district = Column(String)
    class_completed = Column(String)
    category = Column(String)
    family_income = Column(Float)

    assessments = relationship("AssessmentResult", back_populates="user")
    course_recommendations = relationship("CourseRecommendation", back_populates="user")
    college_recommendations = relationship("CollegeRecommendation", back_populates="user")
    scholarships = relationship("ScholarshipRecommendation", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")

class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    science_score = Column(Float)
    commerce_score = Column(Float)
    arts_score = Column(Float)
    technology_score = Column(Float)
    management_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="assessments")

class CourseRecommendation(Base):
    __tablename__ = "course_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course = Column(String)
    score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="course_recommendations")

class CollegeRecommendation(Base):
    __tablename__ = "college_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    college_name = Column(String)
    district = Column(String)
    state = Column(String)
    available_courses = Column(String)
    facilities = Column(String)
    cutoff = Column(Float)
    eligibility = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="college_recommendations")

class ScholarshipRecommendation(Base):
    __tablename__ = "scholarship_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scholarship_name = Column(String)
    amount = Column(String)
    eligibility = Column(String)
    deadline = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="scholarships")

class CareerRoadmap(Base):
    __tablename__ = "career_roadmaps"
    
    id = Column(Integer, primary_key=True, index=True)
    course_name = Column(String, index=True)
    roadmap_json = Column(JSON)

class ChatHistory(Base):
    __tablename__ = "chat_history"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text)
    response = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="chat_history")
