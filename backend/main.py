from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from datetime import datetime

from database import engine, Base, AsyncSessionLocal
from models import Task, TaskStatus
from crud import get_task_by_id, create_task, delete_task, update_task_status, get_all_tasks
from schemas import TaskCreate, TaskOut

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.post("/tasks/", response_model=TaskOut)
async def create_task_route(task: TaskCreate, db: AsyncSession = Depends(get_db)):
    db_task = await create_task(db, task)
    return db_task

@app.delete("/tasks/{task_id}", response_model=TaskOut)
async def delete_task_route(task_id: int, db: AsyncSession = Depends(get_db)):
    db_task = await delete_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/tasks/{task_id}/status", response_model=TaskOut)
async def update_task_status_route(task_id: int, status: TaskStatus, db: AsyncSession = Depends(get_db)):
    db_task = await update_task_status(db, task_id, status)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.get("/tasks/", response_model=List[TaskOut])
async def get_all_tasks_route(db: AsyncSession = Depends(get_db)):
    tasks = await get_all_tasks(db)
    return tasks

@app.get("/tasks/{task_id}", response_model=TaskOut)
async def read_task_route(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await get_task_by_id(db, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

async def get_db():
    async with AsyncSessionLocal() as session:
  
