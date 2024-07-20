# from python:3
# RUN python -m pip install --upgrade pip
# WORKDIR /app
# COPY ./requirements.txt $WORKDIR
# RUN python -m pip install -r ./requirements.txt

FROM python:3.9

ENV PYTHONUNBUFFERED=1

RUN python -m pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
