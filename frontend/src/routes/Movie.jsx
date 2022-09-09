import {API} from "../api";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";


function Movie() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {state} = useLocation();

  async function fetchData(): void {
    setLoading(true)
    await API.getSingleMovie(state)
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
        r["genres"] = r["genres"].split(",")
        setMovie(r)
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
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
          <div className="card bg-danger">
            <div className="row text-center">
              <div className="col">
                <strong className="d-inline text-uppercase font-weight-bold">Error: {error}</strong>
              </div>
            </div>
          </div> :
          <div className="p-2">
            <div className="card bg-secondary">
              <div className="row text-center">
                <div className="col">
                  <strong className="d-inline text-uppercase font-weight-bold">{movie.title} </strong>
                  <div className="d-inline"> {movie.year}</div>
                  <div className="row">
                    <div className="col">
                      {movie.trailer !== null ?
                        <div>
                          <video width="600" height="400" autoPlay>
                            <source src={movie.trailer} type="video/mp4"/>
                          </video>
                        </div>
                        :
                        <div>
                          <img src={movie.image} alt={movie.title} width="400" height="600"/>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="p-2 float-start">{movie.plot}</div>
                      <div className="p-2 float-start">{movie.genres}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Movie