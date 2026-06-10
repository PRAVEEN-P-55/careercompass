from fastapi import APIRouter, Depends
from app.api.dependencies import get_current_user
from app.models.models import User
from typing import Dict, Any

router = APIRouter()

MOCK_ROADMAPS = {
    "B.Sc Computer Science": {
        "title": "B.Sc Computer Science Roadmap",
        "steps": [
            {"id": "1", "title": "12th Science", "description": "Complete 12th with PCM"},
            {"id": "2", "title": "B.Sc Computer Science", "description": "Enroll in a 3-year degree"},
            {"id": "3", "title": "Internships", "description": "Do tech internships in 2nd/3rd year"},
            {"id": "4", "title": "Projects", "description": "Build portfolio projects"},
            {"id": "5", "title": "Placement", "description": "Campus or Off-campus placements"},
            {"id": "6", "title": "Software Engineer", "description": "Start career"}
        ]
    }
}

MOCK_MINDMAPS = {
    "B.Sc Computer Science": {
        "nodes": [
            {"id": "1", "data": {"label": "B.Sc Computer Science"}, "position": {"x": 250, "y": 0}},
            {"id": "2", "data": {"label": "Software Engineer"}, "position": {"x": 100, "y": 100}},
            {"id": "3", "data": {"label": "AI Engineer"}, "position": {"x": 400, "y": 100}},
            {"id": "4", "data": {"label": "Data Analyst"}, "position": {"x": 250, "y": 150}},
            {"id": "5", "data": {"label": "Cyber Security Analyst"}, "position": {"x": 50, "y": 200}},
            {"id": "6", "data": {"label": "Web Developer"}, "position": {"x": 450, "y": 200}}
        ],
        "edges": [
            {"id": "e1-2", "source": "1", "target": "2"},
            {"id": "e1-3", "source": "1", "target": "3"},
            {"id": "e1-4", "source": "1", "target": "4"},
            {"id": "e2-5", "source": "2", "target": "5"},
            {"id": "e3-6", "source": "3", "target": "6"}
        ]
    }
}

@router.get("/career-roadmap/{course_name}")
def get_roadmap(course_name: str, current_user: User = Depends(get_current_user)):
    return MOCK_ROADMAPS.get(course_name, {"title": f"{course_name} Roadmap", "steps": []})

@router.get("/career-mindmap/{course_name}")
def get_mindmap(course_name: str, current_user: User = Depends(get_current_user)):
    return MOCK_MINDMAPS.get(course_name, {"nodes": [], "edges": []})
