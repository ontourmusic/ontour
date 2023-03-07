from datetime import date
import uvicorn
import psycopg2
import json

from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import Artist as SchemaArtist

from schema import Artist

from models import Artist as ModelArtist

from models import Reviews as ModelReviews

from models import Venue_Reviews as ModelVenue_Reviews

from supabase import create_client, Client

import os
from dotenv import load_dotenv

from fastapi.middleware.cors import CORSMiddleware

load_dotenv('.env')


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com:3000",
    "ec2-3-129-52-41.us-east-2.compute.amazonaws.com:3000",
    "http://ec2-3-129-52-41.us-east-2.compute.amazonaws.com",
    "ec2-3-129-52-41.us-east-2.compute.amazonaws.com:",
    "ontour.tech",
    "www.ontour.tech",
    "3.129.52.41",
    "http://3.129.52.41",
    "http://ontour.tech",
    "http://www.ontour.tech"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"]
# )

# to avoid csrftokenError
app.add_middleware(DBSessionMiddleware, db_url='postgresql://postgres:ontour@3.129.52.41/postgres')

url = 'https://zouczoaamusrlkkuoppu.supabase.co'
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo"
supabase: Client = create_client(url, key)


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
    artist = supabase.table('artists').select('*').execute()
    return artist

@app.get('/artist/{artist_id}')
async def author(artist_id: int):
    artist = supabase.table('artists').select('*').eq('artist_id', artist_id).execute()
    return artist

@app.get('/reviews/{artist_id}')
async def reviews(artist_id: int):
    reviews = supabase.table('artist_reviews').select('*').eq('artist_id', artist_id).execute()
    return reviews

@app.post('/reviews/')
async def reviews(artist_id: int, venue: str, rating: float, description: str, fname: str, lname: str, eventname: str, date: str):
    db_review = supabase.table('artist_reviews').insert({'artist_id': artist_id,'rating': rating, 'review': description, 'fname': fname, 'lname': lname, 'event': eventname, 'eventDate': date}).execute()
    return db_review

# @app.get('/search_artist/{search_text}')
# async def search_artist(search_text: str):
#     print(search_text)
#     conn = psycopg2.connect(user="postgres", password="ontour", host="ec2-3-129-52-41.us-east-2.compute.amazonaws.com", port="5432", database="postgres")
#     cur = conn.cursor()
#     print("Database opened successfully")
#     print(conn.get_dsn_parameters(), "\n")
#     print("SELECT * FROM search_artist_text(" + search_text + ");")
#     cur.execute("SELECT * FROM search_artist_text('" + search_text + "');")
#     rows = cur.fetchall()
#     res_dict = []
#     headers = ["artist_id", "fname", "lname", "genre", "alias", "image_url", "images"]
#     for row in rows:
#         print(row)
#         res_row = dict(zip(headers, row))
#         res_dict.append(res_row)
#     res = dict(zip(headers, rows[0]))
#     return res_dict

# @app.get('/reviews/')
# async def reviews():
#     conn = psycopg2.connect(user="postgres", password="ontour", host="ec2-3-129-52-41.us-east-2.compute.amazonaws.com", port="5432", database="postgres")
#     cur = conn.cursor()
#     cur.execute("SELECT artist_id, rating FROM reviews;")
#     rows = cur.fetchall()
#     res_dict = []
#     headers = ["artist_id", "rating"]
#     for row in rows:
#         print(row)
#         res_row = dict(zip(headers, row))
#         res_dict.append(res_row)

#     return res_dict

@app.get('/search_venue/{search_text}')
async def search_venue(search_text: str):
    conn = psycopg2.connect(user="postgres", password="ontour", host="ec2-3-129-52-41.us-east-2.compute.amazonaws.com", port="5432", database="postgres")
    cur = conn.cursor()
    cur.execute("SELECT * FROM public.venues WHERE venue_name='" + search_text +"';")
    rows = cur.fetchall()
    res_dict = []
    headers = ["venue_id", "venue_name", "image_url", "images"]
    for row in rows:
        res_row = dict(zip(headers, row))
        res_dict.append(res_row)
    
    #jsonify(rows)
    res = dict(zip(headers, rows[0]))
    # res_json = json.dumps(res, indent = 4) 
    return res_dict

@app.get('/venue_reviews/{venue_id}')
async def reviews(venue_id: int):
    venue = supabase.table('venue_reviews').select('*').eq('venue_id', venue_id).execute()
    return venue

@app.post('/venue_reviews/')
async def reviews(venue_id: int, rating: float, description: str, name: str, artistname: str, date: str):
    db_review = supabase.table('venue_reviews').insert({'venue_id': venue_id,'rating': rating, 'review': description, 'name': name, 'artist': artistname, 'eventDate': date}).execute()
    return db_review


# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)