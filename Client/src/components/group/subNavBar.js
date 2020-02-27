import React from 'react';
import '../../css/subNavBar.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { ai } from "../util/telemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import { createBrowserHistory } from "history";
import axios from 'axios'

const history = createBrowserHistory({ basename: "" });
ai.initialize({ history: history });

 class SubNavBar extends React.Component {
   componentDidMount(){
    let propsHistory = this.props.history;
    if (!this.props.groupsList.length) {
      axios.get("https://twobinlabelsapi.azurewebsites.net/api/v1/group/all")
            .then(result => {        
                // if (!result.groups.length) { // && result.status !== 200
                //     throw Error(result.status + " - " + result.error + " - " + result.message );
                // }
                console.log(result.data[0].groupId)
                this.props.storeGroupsList(result.data)
                this.props.saveSelectedGroup(result.data[0].groupName)
                this.props.saveSelectedID(result.data[0].groupId)
            })
            .catch(function (e) {
            //  console.log(e)
              ai.appInsights.trackException({ error: new Error(e), severityLevel: SeverityLevel.Error });
              propsHistory.push('/error')
            })
    }
   }


  operateBin = (e) => {
      console.log(e.target.id);
      let target ="/group/"+e.target.id;
      this.props.history.push(target)
  };

  addBin = (e) => {
    let target ="/group/addBin/add/0";
    
      this.props.history.push(target)  
  }

  selectGroup = (e) =>{
    this.props.saveSelectedGroup(e.innerText);
    this.props.saveSelectedID(e.id);
    this.props.history.push("/group");
  }

  routeToPrintLabel = () =>{
    this.props.history.push("/printlabel")
  }
  render(){
  return (
    
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary mx-auto">
        {/* <div className="ml-2"><span className="text-red">
          {this.props.selectedGroup}</span>
        </div> */}
        <div className="ml-2">
        <div className="dropdown">
        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           {this.props.selectedGroup}
        </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" >
            {
              this.props.groupsList.map((group, index) =>
                <a className="dropdown-item" key={index}  onClick={(e) =>this.selectGroup(e.target)} id={group.groupId}>
                  {group.groupName}
                </a>
              )
            }
          </div>
        </div>
        </div>
        <div className="ml-auto">
        <span id="addBin" className="sub-nav btn sub-nav-a " onClick={this.routeToPrintLabel}>
            Print Label
          </span>
          <span id="addBin" className="sub-nav btn sub-nav-a " onClick={this.addBin}>
            Add Single Bin
          </span>
          <span id ="addMultipleBins" className="sub-nav btn sub-nav-a " onClick={this.operateBin}>
           Add Multiple Bins
          </span>
        </div>
      </nav>
    
  );
}}
function mapStateToProps(state){
  return{
    selectedGroup : state.group.selectedGroup,
    groupsList: state.group.groups
  }
}

function mapDispatchToProps(dispatch) {
  return {
      storeGroupsList: (groups) =>
          dispatch({
              type: "LOAD_GROUPS",
              payload: groups
          }),
          saveSelectedGroup: (selectedGroup) => {
            dispatch({
                type: "UPDATE_SELECTED",
                payload: selectedGroup
            })
        },
        saveSelectedID: (selectedID) =>{
          dispatch({
            type: "UPDATE_SELECTEDID",
            payload: selectedID
          })
        }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SubNavBar))
