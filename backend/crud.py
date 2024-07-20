from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Task, TaskStatus

async def get_task_by_id(db: AsyncSession, task_id: int):
    result = await db.execute(select(Task).filter(Task.id == task_id))
    return result.scalars().first()

async def create_task(db: AsyncSession, task_data):
    db_task = Task(**task_data.dict())
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

async def delete_task(db: AsyncSession, task_id: int):
    task = await get_task_by_id(db, task_id)
    if task:
        await db.delete(task)
        await db.commit()
    return task

async def update_task_status(db: AsyncSession, task_id: int, status: TaskStatus):
    task = await get_task_by_id(db, task_id)
    if task:
        task.status = status
        await db.commit()
        await db.refresh(task)
    return task

async def get_all_tasks(db: AsyncSession):
    result = await db.execute(select(Task))
    return result.scalars().all()
