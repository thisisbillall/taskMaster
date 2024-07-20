# import uvicorn
# if __name__ == '__main__':
#     uvicorn.run('app.api.api:app', host='0.0.0.0', port=8080, reload=True)

from fastapi import FastAPI
from . import database, models
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

