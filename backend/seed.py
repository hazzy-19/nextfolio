from backend.database import SessionLocal, engine, Base
from backend import models, schemas, crud
from datetime import datetime, timedelta

# Create tables if they don't exist (though main.py does this too)
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(models.Task).first():
        print("Data already exists. Skipping seed.")
        db.close()
        return

    print("Seeding data...")

    # --- Seeding Collections ---
    collections = [
        {"name": "Inspiration", "slug": "inspiration", "from_color": "from-pink-500", "to_color": "to-rose-500"},
        {"name": "Portfolio", "slug": "portfolio", "from_color": "from-amber-400", "to_color": "to-orange-500"},
        {"name": "Designs", "slug": "designs", "from_color": "from-emerald-400", "to_color": "to-cyan-500"},
        {"name": "Photography", "slug": "photography", "from_color": "from-violet-500", "to_color": "to-purple-500"},
    ]
    
    db_collections = {}
    for col in collections:
        db_col = models.Collection(**col)
        db.add(db_col)
        db.commit()
        db.refresh(db_col)
        db_collections[col["slug"]] = db_col

    # --- Seeding Gallery Items ---
    # We map slug to ID
    items = [
        {
            "id": 1,
            "type": "image",
            "title": "Mountain Vista",
            "thumbnail": "bg-gradient-to-br from-blue-500 to-purple-600",
            "height": "h-64",
            "likes": 234,
            "tags": "nature,landscape,inspiration",
            "collection_id": db_collections["inspiration"].id
        },
        {
            "id": 2,
            "type": "image",
            "title": "Urban Architecture",
            "thumbnail": "bg-gradient-to-br from-gray-600 to-gray-800",
            "height": "h-72",
            "likes": 189,
            "tags": "city,architecture,portfolio",
            "collection_id": db_collections["portfolio"].id
        },
         {
            "id": 3,
            "type": "image",
            "title": "Ocean Sunset",
            "thumbnail": "bg-gradient-to-br from-orange-400 to-red-600",
            "height": "h-56",
            "likes": 412,
            "tags": "nature,sunset,inspiration",
            "collection_id": db_collections["inspiration"].id
        },
    ]

    for item in items:
        # Pydantic schema expects tags as string? No, our frontend implementation used array, 
        # but our DB model uses String. 
        # Adjusting crud/models to handle this mismatch might be needed, 
        # but for now let's just insert valid DB models.
        db_item = models.GalleryItem(**item)
        db.add(db_item)
    
    # --- Seeding Tasks ---
    # Using fixed dates relative to "now" but stored as static for this seed
    base_date = datetime.utcnow()
    
    tasks = [
        {
            "title": "Review design mockups",
            "description": "Check the latest UI designs.",
            "status": "todo",
            "priority": "high",
            "due_date": base_date + timedelta(days=1),
            "tags": "design,ui"
        },
        {
            "title": "Implement API integration",
            "description": "Connect frontend to backend.",
            "status": "in-progress",
            "priority": "high",
            "due_date": base_date + timedelta(days=2),
            "tags": "backend,api"
        },
        {
             "title": "Coffee break",
            "description": "Take a break.",
            "status": "done",
            "priority": "low",
            "due_date": base_date - timedelta(days=1),
            "tags": "health"
        }
    ]

    for task in tasks:
        db_task = models.Task(**task)
        db.add(db_task)

    db.commit()
    print("Seeding complete.")
    db.close()

if __name__ == "__main__":
    seed_data()
