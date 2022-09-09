from fastapi import APIRouter, HTTPException, status
import requests
from app.config import settings

router = APIRouter(
    prefix="/api/v1",
    tags=['IMDb Movies']
)


@router.get("/MostPopularMovies")
async def get_most_popular() -> dict | HTTPException:
    movies = requests.get(f"https://imdb-api.com/en/API/MostPopularMovies/{settings.IMDB_KEY}")
    if not movies.ok:
        return HTTPException(detail=f"Error fetching movies: {movies.reason}", status_code=status.HTTP_400_BAD_REQUEST)
    return movies.json()


@router.get("/title/{movie_id}")
async def get_movie(movie_id: str) -> dict | HTTPException:
    movie = requests.get(f"https://imdb-api.com/en/API/Title/{settings.IMDB_KEY}/{movie_id}")
    if not movie.ok:
        return HTTPException(detail=f"Movie with id {movie_id} not found", status_code=status.HTTP_400_BAD_REQUEST)
    return movie.json()


@router.get("/image/{movie_id}")
async def get_movie_image(movie_id: str) -> dict | HTTPException:
    images = requests.get(f"https://imdb-api.com/en/API/Images/{settings.IMDB_KEY}/{movie_id}")
    if not images.ok:
        return HTTPException(detail=f"Movie with id {movie_id} not found", status_code=status.HTTP_400_BAD_REQUEST)
    return images.json()
