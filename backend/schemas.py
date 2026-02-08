from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime

# --- Task Schemas ---
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "todo"
    priority: str = "medium"
    # Frontend sends due date as string? Or iso? 
    # If frontend sends ISO string, datetime parses it.
    due_date: Optional[datetime] = Field(None, alias="dueDate")
    tags: List[str] = Field(default_factory=list)

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime

    @field_validator('tags', mode='before')
    @classmethod
    def parse_tags(cls, v):
        if isinstance(v, str):
            return [t.strip() for t in v.split(',') if t.strip()]
        return v

    class Config:
        from_attributes = True
        populate_by_name = True

# --- Gallery Schemas ---
class CollectionBase(BaseModel):
    name: str
    slug: str
    from_color: str = Field("from-gray-500", alias="from")
    to_color: str = Field("to-gray-600", alias="to")

class CollectionCreate(CollectionBase):
    pass

class Collection(CollectionBase):
    id: int

    class Config:
        from_attributes = True
        populate_by_name = True

class GalleryItemBase(BaseModel):
    title: str
    type: str
    content: Optional[str] = None
    thumbnail: Optional[str] = None
    height: str = "h-64"
    tags: List[str] = Field(default_factory=list)
    collection_id: Optional[int] = None

class GalleryItemCreate(GalleryItemBase):
    pass

class GalleryItem(GalleryItemBase):
    id: int
    likes: int = 0
    liked: bool = False

    @field_validator('tags', mode='before')
    @classmethod
    def parse_tags(cls, v):
        if isinstance(v, str):
            return [t.strip() for t in v.split(',') if t.strip()]
        return v

    class Config:
        from_attributes = True
        populate_by_name = True
