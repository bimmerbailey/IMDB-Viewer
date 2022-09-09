FROM python:3.10.4

WORKDIR /backend

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENV PYTHONPATH=/backend
