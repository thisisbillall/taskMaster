from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from models import TaskStatus

class TaskCreate(BaseModel):
    title: str
    status: TaskStatus

class TaskOut(BaseModel):
    id: int
    title: str
    status: TaskStatus
    created_at: datetime

    class Config:
        orm_mode = True
