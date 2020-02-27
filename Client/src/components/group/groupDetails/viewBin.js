import React from "react";
import "../../../css/viewBin.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SubNavBar from "../subNavBar";


class ViewBin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twoBin:{}
    };
  }

  componentDidMount(){
    fetch("https://twobinlabel.azurewebsites.net/api/twobin/1.0/twobin/id/" + this.props.selectedGroup+"/"+this.props.selectedTwoBin )
      .then(res => res.json())
      .then(result => {
        this.setState({
          twoBin:result
        })
        console.log(this.state.twoBin)
      });
  }
  goBack = () => {
    window.history.back()
  }
  render() {

    return (
      <React.Fragment>
      <SubNavBar groupName={this.props.selectedGroup}/>
      
        <div className="mx-auto">

          <h2 className="view-bin-title">View Bin Detail</h2>
          <table className="table text-centered ">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="binID" className="col-sm-0 col-form-label">
                    Bin ID :
                  </label>
                </td>
                <td className="td">
                  {this.state.twoBin.idBin}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="fillqty" className="col-sm-0 col-form-label">
                    Fill Quantity :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idFillQTY}</td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="labelColor"
                    className="col-sm-0 col-form-label"
                  >
                    Label Color :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idLabelColor}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="binColor" className="col-sm-0 col-form-label">
                    Bin Color :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idBinColor}
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="stockRoom"
                    className="col-sm-0 col-form-label"
                  >
                    Stock Room :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idStockRoom}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="findnum" className="col-sm-0 col-form-label">
                    Find Num :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.findNum}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="facilty" className="col-sm-0 col-form-label">
                    Facility :
                  </label>
                </td>
                <td className="td">{this.state.twoBin.facility}</td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="partNumber"
                    className="col-sm-0 col-form-label"
                  >
                    Status :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idStatus}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="partDesc" className="col-sm-0 col-form-label">
                    Part Description :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idPartDescription}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="location" className="col-sm-0 col-form-label">
                    Location :
                  </label>
                </td>
                <td className="td">
                {this.state.twoBin.idLocation}
              </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="status"
                    className="col-sm-0 col-form-label"
                  >
                    Part Number :
                  </label>
                </td>
                <td className="td">{this.state.twoBin.idPartNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <br />
     
      
        <button type="button" className="btn btn-back btn-outline-secondary" onClick={this.goBack}>Back</button>
        </React.Fragment>
    );
  }
}

function mapStateToProps(state){
  return {
    selectedTwoBin : state.group.selectedBin,
    selectedGroup : state.group.selectedGroup
  }
}

export default connect(mapStateToProps)(withRouter(ViewBin));