from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    class_completed: Optional[str] = None
    category: Optional[str] = None
    family_income: Optional[float] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    class_completed: Optional[str] = None
    category: Optional[str] = None
    family_income: Optional[float] = None

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    age: Optional[int]
    gender: Optional[str]
    state: Optional[str]
    district: Optional[str]
    class_completed: Optional[str]
    category: Optional[str]
    family_income: Optional[float]

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
