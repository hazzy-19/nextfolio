from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.GalleryItem])
def read_gallery_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_gallery_items(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.GalleryItem)
def create_gallery_item(item: schemas.GalleryItemCreate, db: Session = Depends(get_db)):
    # Check if collection exists if ID provided? Skipped for simplicity
    return crud.create_gallery_item(db=db, item=item)

@router.post("/{item_id}/like", response_model=schemas.GalleryItem)
def like_gallery_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.toggle_like_gallery_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.delete("/{item_id}", response_model=schemas.GalleryItem)
def delete_gallery_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.delete_gallery_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.get("/collections", response_model=List[schemas.Collection])
def read_collections(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_collections(db, skip=skip, limit=limit)

@router.post("/collections", response_model=schemas.Collection)
def create_collection(collection: schemas.CollectionCreate, db: Session = Depends(get_db)):
    db_collection = crud.get_collection_by_slug(db, slug=collection.slug)
    if db_collection:
        raise HTTPException(status_code=400, detail="Collection already exists")
    return crud.create_collection(db=db, collection=collection)

@router.delete("/collections/{slug}", response_model=schemas.Collection)
def delete_collection(slug: str, db: Session = Depends(get_db)):
    # Look up by slug first since frontend uses slugs often, 
    # but our CRUD uses ID? Let's fix CRUD to use slug or lookup first.
    # Actually CRUD delete uses ID. Let's find ID from slug.
    collection = crud.get_collection_by_slug(db, slug)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    
    crud.delete_collection(db, collection.id)
    return collection
