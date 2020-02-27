import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import '../../css/moreAction.css'
import { LogOut } from '../aad/authContext'
import { withRouter } from 'react-router-dom'
class MoreAction extends React.Component {
  
  profile = () => {
    this.props.history.push("/profile")
  }
  render() {
    return (
        <DropdownButton
          alignRight
          className="dropdown-menu-align-right ml-auto"
           title={<span> {this.props.name} <i className="fa fa-cog" style={{ fontSize: 25 }} /></span>}
          style={{ fontSize: 25, color: "white" }}
        >
          <Dropdown.Item  onClick={this.profile}>
            <i
              className="fa fa-user"
              style={{ fontSize: 20, color: "black" }}
            />
            &nbsp;&nbsp;Profile
          </Dropdown.Item>
          {/* <Dropdown.Item divider /> */}
          <Dropdown.Item  onClick={LogOut}>
            <i
              className="fa fa-sign-out"
              style={{ fontSize: 22, color: "black" }}
              
            />{" "}
            &nbsp;Logout
          </Dropdown.Item>
        </DropdownButton>
      
    );
  }
}

export default withRouter(MoreAction);


