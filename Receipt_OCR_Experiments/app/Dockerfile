FROM ubuntu:focal

EXPOSE 5000

RUN apt update && \
    apt -y install wget && \
    apt -y install python3 && \
    apt -y install tesseract-ocr && \
    apt -y install pip

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY server.py .
COPY a.py .