import React, {useEffect, useState} from 'react';
import {API} from "../api";
import {useNavigate} from "react-router-dom";

function RandomMovie() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let randomMovie = Math.floor(Math.random() * 100)

  async function fetchData(): void {
    setLoading(true)
    await API.getMostPopular()
      .then((r) => {
        if (!r.ok) {
          throw Error(r.statusText)
        }
        return r.json()
      })
      .then(async (r) => {
        if (r["errorMessage"]) {
          throw Error(r["errorMessage"])
        }
        let image = await fetchImage(r["items"][randomMovie]["id"])
        if (image["items"].length !== 0) {
          r["items"][randomMovie]["image"] = image["items"][0]["image"]
        }
        setMovie(r["items"][randomMovie])
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

  async function fetchImage(movieID) {
    return await API.getLargeImage(movieID)
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
        return r
      })
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
        <div className="d-flex justify-content-center text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> :
        error ?
          <div>
            <div className=" pb-2">
              <button type="button" className="btn btn-primary" onClick={fetchData}>Pick Random Movie</button>
            </div>
            <div className="card bg-danger">
              <div className="row text-center">
                <div className="col">
                  <strong className="d-inline text-uppercase font-weight-bold">Error: {error}</strong>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="p-2">
            <div className=" pb-2">
              <button type="button" className="btn btn-primary" onClick={fetchData}>Pick Random Movie</button>
            </div>
            <div className="card bg-secondary p-2">
              <div className="row">
                <div className="col">
                  <strong className="d-inline text-uppercase font-weight-bold">{movie.title} </strong>
                  <div className="d-inline"> {movie.year}</div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <img src={movie.image} alt={movie.title} width="600" height="400" className="pointer"
                       onClick={e => routeChange(e, movie.id)}/>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default RandomMovie