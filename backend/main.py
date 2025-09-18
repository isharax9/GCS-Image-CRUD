from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import storage
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React dev server
        "http://localhost:3000",  # Production frontend
        "http://your-server-ip:3000",  # Replace with your actual server IP
        "https://your-domain.com",  # If using HTTPS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load service account key
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "key.json")

BUCKET_NAME = os.getenv("BUCKET_NAME", "my-poc-images-bucket")
client = storage.Client()
bucket = client.bucket(BUCKET_NAME)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    blob = bucket.blob(file.filename)
    blob.upload_from_file(file.file, content_type=file.content_type)
    return {"message": "Uploaded", "filename": file.filename}

@app.get("/list/")
async def list_images():
    blobs = bucket.list_blobs()
    return {"files": [b.name for b in blobs]}

@app.get("/download/{filename}")
async def download_image(filename: str):
    blob = bucket.blob(filename)
    if not blob.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return {"download_url": blob.public_url}

@app.delete("/delete/{filename}")
async def delete_image(filename: str):
    blob = bucket.blob(filename)
    if not blob.exists():
        raise HTTPException(status_code=404, detail="File not found")
    blob.delete()
    return {"message": "Deleted", "filename": filename}
