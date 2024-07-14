from typing import Optional

from pydantic import BaseModel


class News(BaseModel):
    title: Optional[str] = None
    image_url: Optional[str] = None
    link: str
    time: Optional[int] = None
