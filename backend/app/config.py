import os
from pydantic import BaseSettings


class Settings(BaseSettings):
    IMDB_KEY = os.environ.get("IMDB_KEY", None)


settings = Settings()
