import uvicorn
from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import Artist as SchemaArtist

from schema import Artist

from models import Artist as ModelArtist

import os
from dotenv import load_dotenv

load_dotenv('.env')


app = FastAPI()

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url='postgresql://postgres:ontour@3.17.148.99/postgres')

@app.get("/")
async def root():
    return {"message": "hello world"}


# @app.post('/book/', response_model=SchemaBook)
# async def book(book: SchemaBook):
#     db_book = ModelBook(title=book.title, rating=book.rating, author_id = book.author_id)
#     db.session.add(db_book)
#     db.session.commit()
#     return db_book

# @app.get('/book/')
# async def book():
#     book = db.session.query(ModelBook).all()
#     return book


  
@app.post('/artist/', response_model=SchemaArtist)
async def author(author:SchemaArtist, fname: str, lname: str):
    db_artist = ModelArtist(fname=artist.name, lname=artist.lname)
    db.session.add(db_artist)
    db.session.commit()
    return db_artist

@app.get('/artist/')
async def author():
    artist = db.session.query(ModelArtist).all()
    return artist


# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)