import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Header.css";

class Header extends Component {
  renderLinks() {
    console.log(this.props);
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>
      );
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className={classes.Navbar}>
        Dappll Do Voter
        <ul className={classes.NavigationItems}>{this.renderLinks()}</ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
