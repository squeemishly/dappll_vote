import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./Header.css";

class Header extends Component {
  renderLinks() {
    console.log(this.props);
    if (this.props.authenticated) {
      return [
        <li key={1}>
          <Link className={classes.Link} to="/results">
            Results
          </Link>
        </li>,
        <li key={2}>
          <Link className={classes.Link} to="/profile">
            Profile
          </Link>
        </li>,
        <li key={3}>
          <Link className={classes.Link} to="/ballot">
            Ballot
          </Link>
        </li>,
        <li key={4}>
          <Link className={classes.Link} to="/signout">
            Sign Out
          </Link>
        </li>
      ];
    } else {
      return [
        <li key={1}>
          <Link className={classes.Link} to="/results">
            Results
          </Link>
        </li>,
        <li key={2}>
          <Link className={classes.Link} to="/signin">
            Sign In
          </Link>
        </li>,
        <li key={3}>
          <Link className={classes.Link} to="/signup">
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
