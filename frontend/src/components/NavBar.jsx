import {Link} from "react-router-dom";
import "bootstrap/js/src/collapse.js";

export default function NavBar() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/random">Random</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/most-popular">Most Popular</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}