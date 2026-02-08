from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Collection(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    from_color = Column(String, default="from-gray-500")
    to_color = Column(String, default="to-gray-600")

    items = relationship("GalleryItem", back_populates="collection")

class GalleryItem(Base):
    __tablename__ = "gallery_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    type = Column(String) # 'image', 'text', 'video'
    content = Column(String, nullable=True) # Text content or Image URL (if we host it)
    thumbnail = Column(String, nullable=True) # CSS class or URL
    height = Column(String, default="h-64")
    likes = Column(Integer, default=0)
    liked = Column(Boolean, default=False) # Per-user in real app, simplistic here
    
    collection_id = Column(Integer, ForeignKey("collections.id"), nullable=True)
    collection = relationship("Collection", back_populates="items")
    
    # Simple tag storage as comma-separated string for SQLite simplicity
    tags = Column(String, default="") 

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    status = Column(String, default="todo") # todo, in-progress, done
    priority = Column(String, default="medium") # low, medium, high
    due_date = Column(DateTime, default=datetime.utcnow)
    tags = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
