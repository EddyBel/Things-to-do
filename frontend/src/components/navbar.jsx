import React from "react";
import { Link } from "react-router-dom";
import Config from "../web.config";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {Config.TITLE_WEB}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {Config.NAVBAR_OPTIONS.map((option) => (
              <li className="nav-item" key={`${option.title}-option-navbar`}>
                <Link className="nav-link active" to={option.link}>
                  {option.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
