import React from "react";
import SubNavBar from "../subNavBar";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import "../../../css/addBin.css";
import axios from 'axios';



class AddBin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      addOrEdit:''
    };
  }

  componentDidMount() {
    if (this.props.match.params.addedit === 'edit') {
      axios.get("https://twobinlabelsapi.azurewebsites.net/api/v1/twobin/id/" +
        this.props.selectedGroup+"/"+this.props.match.params.binID)
        .then(res => {
          this.setState({ fields: res.data })
        })
    } 
  }

  
  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};

    
    if (!fields["idFillQTY"]) {
      errors["idFillQTY"] = true;
    }
    if (!fields["idLabelColor"]) {
      errors["idLabelColor"] = true;
    }
    if (!fields["idBinColor"]) {
      errors["idBinColor"] = true;
    }
    if (!fields["idStockRoom"]) {
      errors["idStockRoom"] = true;
    }
    if (!fields["findNum"]) {
      errors["findNum"] = true;
    }
    if (!fields["facility"]) {
      errors["facility"] = true;
    }
    if (!fields["idPartNumber"]) {
      errors["idPartNumber"] = true;
    }
    if (!fields["idPartDescription"]) {
      errors["idPartDescription"] = true;
    }
    if (!fields["idLocation"]) {
      errors["idLocation"] = true;
    }
    this.setState({ errors: errors });
    if(!Object.keys(errors).length){
      this.submitBin();
    }
  };
   submitBin = async() =>{
     const resp = await fetch("https://twobinlabel.azurewebsites.net/api/twobin/1.0/add",{
      method:'POST',
      headers:{
        'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        facility: this.state.fields["facility"],
        findNum: this.state.fields["findNum"],
        group: {
          groupID: this.props.selectedGroupID,
          groupName: this.props.selectedGroup
        },
        
        idBinColor: this.state.fields["idBinColor"],
        idFillQTY: this.state.fields["idFillQTY"],
        idLabelColor: this.state.fields["idLabelColor"],
        idLocation: this.state.fields["idLocation"],
        idPartDescription: this.state.fields["idPartDescription"],
        idPartNumber: this.state.fields["idPartNumber"],
        idStatus: 'C',
        idStockRoom: this.state.fields["idStockRoom"],
      })
    })
    if(resp.ok){
      this.props.history.push("/group")
    }
    else{
      this.props.history.push("/")
    }
    
  }
  handleChange = (field, e) => {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  };
  render() {
    return (
      <div>
        <SubNavBar />
        <div className="container-fluid">
          <table className="table text-centered mx-auto">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="binID" className="col-sm-0 col-form-label">
                    Bin ID
                  </label>
                </td>
                <td><span>{
                  this.props.match.params.addedit === 'add'?
                  'BinID will be generated automatically':
                  this.state.fields.idBin
                }
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="idFillQTY" className="col-sm-0 col-form-label">
                    Fill Quantity
                  </label>
                </td>
                <td>
                  <input
                    type="number"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idFillQTY"] !== undefined &&
                      this.state.errors["idFillQTY"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idFillQTY"
                    placeholder="Fill Quantity"
                    onChange={this.handleChange.bind(this, "idFillQTY")}
                    value={this.state.fields.idFillQTY}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="idLabelColor"
                    className="col-sm-0 col-form-label"
                  >
                    Label Color
                  </label>
                </td>
                <td>
                  
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idLabelColor"] !== undefined &&
                      this.state.errors["idLabelColor"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idLabelColor"
                    placeholder=" LabelColor"
                    onChange={this.handleChange.bind(this, "idLabelColor")}
                    value={this.state.fields.idLabelColor}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="idBinColor" className="col-sm-0 col-form-label">
                    Bin Color
                  </label>
                </td>
                <td>
                  
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idBinColor"] !== undefined &&
                      this.state.errors["idBinColor"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idBinColor"
                    placeholder="Color"
                    onChange={this.handleChange.bind(this, "idBinColor")}
                    value={this.state.fields.idBinColor}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="idStockRoom"
                    className="col-sm-0 col-form-label"
                  >
                    Stock Room
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idStockRoom"] !== undefined &&
                      this.state.errors["idStockRoom"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idStockRoom"
                    placeholder="Stock Room"
                    onChange={this.handleChange.bind(this, "idStockRoom")}
                    value={this.state.fields.idStockRoom}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="findNum" className="col-sm-0 col-form-label">
                    Find Num
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["findNum"] !== undefined &&
                      this.state.errors["findNum"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="findNum"
                    placeholder="Find num"
                    onChange={this.handleChange.bind(this, "findNum")}
                    value={this.state.fields.findNum}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="facility" className="col-sm-0 col-form-label">
                    Facility
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["facility"] !== undefined &&
                      this.state.errors["facility"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="facility"
                    placeholder="Facility"
                    onChange={this.handleChange.bind(this, "facility")}
                    value={this.state.fields.facility}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="idPartNumber"
                    className="col-sm-0 col-form-label"
                  >
                    Part Number
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idPartNumber"] !== undefined &&
                      this.state.errors["idPartNumber"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idPartNumber"
                    placeholder="PartNumber"
                    onChange={this.handleChange.bind(this, "idPartNumber")}
                    value={this.state.fields.idPartNumber}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="idPartDescription" className="col-sm-0 col-form-label">
                    Part Description
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idPartDescription"] !== undefined &&
                      this.state.errors["idPartDescription"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idPartDescription"
                    placeholder="Part Description"
                    onChange={this.handleChange.bind(this, "idPartDescription")}
                    value={this.state.fields.idPartDescription}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="idLocation" className="col-sm-0 col-form-label">
                    Location
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className={`form-control form-control-sm col-sm-5 ${
                      typeof this.state.errors["idLocation"] !== undefined &&
                      this.state.errors["idLocation"]
                        ? "form-control form-control-sm col-sm-5 border-danger"
                        : ""
                    }`}
                    id="idLocation"
                    placeholder="Location"
                    onChange={this.handleChange.bind(this, "idLocation")}
                    value={this.state.fields.idLocation}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label
                    htmlFor="idStatus"
                    className="col-sm-0 col-htmlForm-label"
                  >
                    Status
                  </label>
                </td>
                <td>
                  <select
                    className="form-control form-control-sm col-sm-5"
                    id="idStatus"
                  >
                    <option>other</option>
                    <option>new</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <button
              className="btn btn-outline-secondary mb-2 btn-sm addbin"
              type="submit"
              onClick={this.handleValidation}
            >
              {(this.props.match.params.addedit === 'add') ? (<span>Add Bin</span>) : (<span>Save</span>)} 
            </button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    selectedGroup: state.group.selectedGroup,
    selectedGroupID: state.group.selectedGroupID
  };
}
export default connect(mapStateToProps)(withRouter(AddBin))
