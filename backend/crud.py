from sqlalchemy.orm import Session
import models, schemas

# --- Collections ---
def get_collections(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Collection).offset(skip).limit(limit).all()

def create_collection(db: Session, collection: schemas.CollectionCreate):
    # Pydantic alias/populate_by_name handles 'from' -> 'from_color' in .dict() if configured?
    # Actually .dict(by_alias=False) gives model field names (from_color).
    # .dict(by_alias=True) gives 'from'.
    # We want dict() to match DB columns (snake_case).
    data = collection.model_dump(by_alias=False)
    db_collection = models.Collection(**data)
    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)
    return db_collection

def get_collection_by_slug(db: Session, slug: str):
    return db.query(models.Collection).filter(models.Collection.slug == slug).first()

# --- Gallery Items ---
def get_gallery_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.GalleryItem).offset(skip).limit(limit).all()

def create_gallery_item(db: Session, item: schemas.GalleryItemCreate):
    data = item.model_dump(by_alias=False)
    if isinstance(data.get('tags'), list):
        data['tags'] = ",".join(data['tags'])
    
    db_item = models.GalleryItem(**data)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def toggle_like_gallery_item(db: Session, item_id: int):
    item = db.query(models.GalleryItem).filter(models.GalleryItem.id == item_id).first()
    if item:
        item.liked = not item.liked
        if item.liked:
            item.likes += 1
        else:
            item.likes = max(0, item.likes - 1)
        db.commit()
        db.refresh(item)
    return item

def delete_gallery_item(db: Session, item_id: int):
    item = db.query(models.GalleryItem).filter(models.GalleryItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def delete_collection(db: Session, collection_id: int):
    # Note: This might cascade delete items depending on DB model, or leave them orphaned.
    # For now, we just delete the collection record.
    collection = db.query(models.Collection).filter(models.Collection.id == collection_id).first()
    if collection:
        db.delete(collection)
        db.commit()
    return collection

# --- Tasks ---
def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: schemas.TaskCreate):
    data = task.model_dump(by_alias=False)
    # Convert tags list to string
    if isinstance(data.get('tags'), list):
        data['tags'] = ",".join(data['tags'])
        
    db_task = models.Task(**data)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task_status(db: Session, task_id: int, status: str):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        task.status = status
        db.commit()
        db.refresh(task)
    return task

def delete_task(db: Session, task_id: int):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task:
        db.delete(task)
        db.commit()
    return task
