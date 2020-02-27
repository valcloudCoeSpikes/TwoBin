import React from "react";
import logo from "../../images/logo.png";
import MoreAction from "../myaccount/moreAction";
import { getCachedUser,getCachedToken } from '../aad/authContext'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  componentDidMount() {
    const details = {
      email: getCachedUser().userName,
      username: getCachedUser().profile.name,
      bearerToken:getCachedToken()
    }
    this.props.storeUserDetails(details);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-light bg-primary">
        <div className="nav-item nav-item-header">
          <Link to="/"><img src={logo} /></Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span>
            <i className="fa fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* <li className="nav-item ">
              <Link className="nav-link" to="/">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/group">Group</Link>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-right " style={{ color: 'white' }}>{this.props.username}</div> */}
        <MoreAction name={this.props.username} email={this.props.email} />

      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.username,
    email: state.user.email
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeUserDetails: (details) =>
      dispatch({
        type: "SAVE_USER_DETAILS",
        payload: details
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
