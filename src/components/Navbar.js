import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";


class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.clear();
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <span onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </span>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            Cart <sup><span className="badge rounded-pill bg-warning text-dark">{this.props.state.cartValue}</span></sup>
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.jwt ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, null)(withRouter(Landing));
