# IMDb-viewer

## Current Container Setup

| Container Name | Image                              | Purpose           | Port |
|----------------|------------------------------------|-------------------|------|
| backend        | python:3.10.4-alpine               | backend (FastAPI) | 8000 |
| frontend       | node:18.2-alpine3.15               | React application | 3000 |

## Project Start

1) Set `IMDB_KEY` in environment variables to your IMDb api token
2) Open cmd/terminal in project root (where this file is)
3) Install frontend packages by running `cd frontend && yarn install && cd ..` (npm can be used but yarn is preferable)
4) run `bin/dev start` to run the docker containers
    * You might have to give exec rights to `bin/dev` file
5) Once backend and frontend containers are running use [localhost:3000](http://localhost:3000) to use frontend

## Project Commands

1) To start Docker containers run `bin/dev start`
2) To stop Docker containers run `bin/dev stop`
    1) To stop and delete volumes run `bin/dev dump`

## Interactive API Documentation

Use [localhost:8000/docs](http://localhost:8000/docs) to interact with API from the browser