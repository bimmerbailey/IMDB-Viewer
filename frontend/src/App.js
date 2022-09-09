import NavBar from "./components/NavBar";
import {Route, Routes} from "react-router-dom";
import RandomMovie from "./routes/RandomMovie";
import PopularMovies from "./routes/PopularMovies";
import Movie from "./routes/Movie";
import React from "react";

function App() {
  return (
    <div className="App bg-black overflow-auto">
      <NavBar/>
      <div className="data">
        <Routes className="">
          <Route path="/" element={<RandomMovie/>}/>
          <Route path="/random" element={<RandomMovie/>}/>
          <Route path="/most-popular" element={<PopularMovies/>}/>
          <Route path="/movie/:id" element={<Movie/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
