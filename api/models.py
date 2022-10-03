from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

Base  = declarative_base()

# class Book(Base):
#     __tablename__ = 'book'
#     id  = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     rating = Column(Float)
#     time_created = Column(DateTime(timezone=True), server_default=func.now())
#     time_updated = Column(DateTime(timezone=True), onupdate=func.now())
#     author_id = Column(Integer, ForeignKey('author.id'))

#     author = relationship('Author')


class Artist(Base):
    __tablename__ = 'artists'
    artist_id = Column(Integer, primary_key=True)
    fname = Column(String)
    lname = Column(String)
    genre = Column(String)
    alias = Column(String)


class Reviews(Base):
    __tablename__ = 'reviews'
    review_id = Column(Integer, primary_key=True)
    artist_id = Column(Integer)
    event_id = Column(Integer)
    rating = Column(Float)
    description = Column(String)
