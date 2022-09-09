import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {API} from "../api";

function PopularMovies() {
  const [movies, setMovies] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  async function fetchData(): void {
    setLoading(true)
    await API.getMostPopular()
      .then((r) => {
        if (!r.ok) {
          throw Error(r.statusText)
        }
        return r.json()
      })
      .then((r) => {
        if (r["errorMessage"]) {
          throw Error(r["errorMessage"])
        }
        // NOTE: Can't add another image to each title, It would use up all available requests (only 100 per day).
        r["items"].sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
        setMovies(r["items"])
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  let navigate = useNavigate();
  const routeChange = (e, id) => {
    e.preventDefault();
    navigate(`/movie/${id}`, {state: id});
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchData();
    return () => {
      // this will cancel the fetch request when the effect is unmounted
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ?
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        error ?
          <div className="card bg-danger">
            <div className="row text-center">
              <div className="col">
                <strong className="d-inline text-uppercase font-weight-bold">Error: {error}</strong>
              </div>
            </div>
          </div> :
          movies.map(movie => {
            return (
              <div className="p-2">
                <div key={movie.id} className="card bg-secondary">
                  <div className="row p-2 align-items-center">
                    <div className="col">
                      <img src={movie.image} alt={movie.title} width="200" height="300"/>
                    </div>
                    <div className="col float-start">
                      <div className="link-primary nav-link pe-auto pointer"
                           onClick={e => routeChange(e, movie.id)}>{movie.title}</div>
                      <div>{movie.year}</div>
                    </div>
                    <div className="col">
                      <div className="row">IMDB Rating</div>
                      <div className="row">
                        <div>{movie.imDbRating} / 10</div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="row">Rank</div>
                      <div className="row">{movie.rank}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  )
}

export default PopularMovies