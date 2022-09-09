const baseURL = "http://localhost:8000/api/v1"
const mostPopularURL = `${baseURL}/MostPopularMovies`
const singleMovieURL = `${baseURL}/title`
const movieImageURL = `${baseURL}/image`


export const API = {
  async getMostPopular() {
    return await fetch(mostPopularURL)
  },
  async getSingleMovie(id) {
    return await fetch(`${singleMovieURL}/${id}`)
  },
  async getLargeImage(id) {
    return await fetch(`${movieImageURL}/${id}`)
  }
}