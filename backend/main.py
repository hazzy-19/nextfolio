from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from fastapi.staticfiles import StaticFiles
from routers import gallery, tasks, upload
import os

# Create DB tables (for dev simplicity, in prod use migrations like Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Ensure static directory exists
os.makedirs("static/uploads", exist_ok=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS Setup
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(upload.router, prefix="/api", tags=["upload"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Nexfolio API"}
