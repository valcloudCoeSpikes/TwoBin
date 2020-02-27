import React from "react";
import SubNavBar from "./subNavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteBin from "./groupDetails/deleteBin";
import "../../css/groupDetails.css";
import { ai } from "../util/telemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";
import { createBrowserHistory } from "history";
import Pagination from "../util/pagination";
import axios from 'axios'
const history = createBrowserHistory({ basename: "" });
ai.initialize({ history: history });

class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      twoBinsList: [],
      pageOfItems: [],
      searchData: "",
      matchItems: []
    };
    let binToDelete ='';
    this.onChangePage = this.onChangePage.bind(this);
  }
  

  viewBin = idBin => {
    console.log(idBin);
    this.props.loadTwoBin(idBin);
    this.props.history.push("/viewBin");
  };

  editBin = binID => {
    this.props.history.push("/group/addBin/edit/" + binID);
  };

  togglePopup = binID => {
    //this.props.loadTwoBin(binID);
    this.binToDelete = binID
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(this.binToDelete);
    console.log(this.props.selectedBin);
    
  };

  fetchFromAPI(selectedId, history) {
    //alert(this.props.selectedGroupID)
    if(selectedId !== undefined && selectedId !== ""){
      console.log(selectedId)
      axios.get("https://twobinlabelsapi.azurewebsites.net/api/twobin/getallbygroupid/"+selectedId)
      .then(result => {   
        console.log(result)     
           this.setState({
                twoBinsList: result.data,
                matchItems: result.data
              });
      })
      .catch(function (e) {
      //  console.log(e)
        ai.appInsights.trackException({ error: new Error(e), severityLevel: SeverityLevel.Error });
        history.push('/error')
      })
    }
    
    // fetch(
    //   "https://twobinlabel.azurewebsites.net/api/twobin/1.0/twobin/" +
    //     selectedGroup
    // )
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result);
    //     if (!result.length && result.status !== 200) {
    //       throw Error(
    //         result.status + " - " + result.error + " - " + result.message
    //       );
    //     }
    //     this.setState({
    //       twoBinsList: result,
    //       matchItems: result
    //     });
    //   })
    //   .catch(function(e) {
    //     ai.appInsights.trackException({
    //       error: new Error(e),
    //       severityLevel: SeverityLevel.Error
    //     });
    //     // propsHistory.push('/error/'+e) // Passing paramater for error page
    //     history.push("/error");
    //   });
  }

  componentDidMount() {
    if (
      this.props.selectedId !== undefined &&
      this.props.selectedId !== ""
    ) {
      this.fetchFromAPI(this.props.selectedId, this.props.history);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.selectedId !== undefined &&
        this.props.selectedId !== prevProps.selectedId) ||
      (this.props.selectedBin !== prevProps.selectedBin)
    ) {
      let propsHistory = this.props.history;
      this.fetchFromAPI(this.props.selectedId, propsHistory);
    }
  }
  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  handleClick = value => {
    if (value === "") {
      this.setState({
        pageOfItems: this.state.twoBinsList,
        matchItems: this.state.twoBinsList
      });
    } else {
      let binSearchData = this.state.matchItems.filter(item => {
        if (item.idLocation !== null && item.idLocation !== "") {
          if (item.idLocation.includes(value)) {
            return item;
          }
        }
      });
      if (binSearchData.length) {
        this.setState({
          matchItems: binSearchData
        });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <SubNavBar />
        <div className="pagination-search">
          <div className="input-group">
            <input
              type="search"
              aria-describedby="button-addon3"
              className="form-control bg-none border-1"
              onChange={e => this.setState({ searchData: e.target.value })}
            />
            <div className="input-group-append ">
              <button
                id="button-addon3"
                type="button"
                className="btn btn-link link-success"
                onClick={e => this.handleClick(this.state.searchData)}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <Pagination
            items={this.state.matchItems}
            onChangePage={this.onChangePage}
          />
        </div>
        <div
          className="table-wrapper-scroll-y my-custom-scrollbar mt-4"
          id="style-2"
        >
          <table className="table-sm table-striped tableGroupDetails  mx-auto ">
            <thead>
              <tr>
                <th>ID Bin</th>
                <th>ID Loc</th>
                <th>ID Part#</th>
                <th>Part Desc</th>
                <th>ID Stockroom</th>
                <th>Fill Qty</th>
                <th>Label Color</th>
                <th />
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.pageOfItems.map((group, index) => (
                <tr key={index}>
                  <td>
                    <span className="span-group">{group.idBin}</span>
                  </td>
                  <td>
                    <span className="span-group">{group.idLocation}</span>
                  </td>
                  <td>
                    <span className="span-group">{group.idPartNumber}</span>
                  </td>
                  <td>
                    <span className="span-group">
                      {group.idPartDescription}
                    </span>
                  </td>
                  <td>
                    <span className="span-group">{group.idStockRoom}</span>
                  </td>
                  <td>
                    <span className="span-group">{group.idFillQTY}</span>
                  </td>
                  <td>
                    <i
                      className="fa fa-circle"
                      style={{
                        fontSize: 18,
                        color: `${
                          group.idBinColor !== null ? group.idBinColor : ""
                        }`
                      }}
                    ></i>
                   
                  </td>
                  <td>
                    <i
                      style={{ padding: 0 }}
                      className="fa fa-eye icon-hover"
                      onClick={() => {
                        this.viewBin(group.idBin);
                      }}
                    />
                  </td>
                  <td>
                    <i
                      style={{ color: "green", padding: 0 }}
                      className="fa fa-pencil icon-hover"
                      onClick={() => this.editBin(group.idBin)}
                    />
                  </td>
                  <td>
                    <i
                      style={{ color: "red", padding: 0 }}
                      className="fa fa-trash icon-hover"
                      onClick={() => {
                        this.togglePopup(group.idBin);
                      }}
                    />

                    {this.state.showPopup ? (
                      <DeleteBin closePopup={this.togglePopup} binToDel = {this.binToDelete} />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedGroup: state.group.selectedGroup,
    selectedBin: state.group.selectedBin,
    selectedId:state.group.selectedGroupID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadTwoBin: twobin => {
      dispatch({
        type: "LOAD_SELECTED_BIN",
        payload: twobin
      });
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GroupDetails));
