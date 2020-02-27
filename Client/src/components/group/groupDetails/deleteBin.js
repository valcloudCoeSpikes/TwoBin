import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

 class DeleteBin extends React.Component {

     deleteBin = async (e) => {
        var count=0;
            count=count+1;
        if (e.target.innerHTML === "Yes") {
          console.log(this.props.selectedGroupId+"/"+this.props.binToDel);
           await fetch('https://twobinlabel.azurewebsites.net/api/twobin/1.0/delete/'+ this.props.selectedGroupId+"/"+this.props.binToDel,{
                method: 'DELETE'
            })
             
            this.props.loadTwoBin(this.props.binToDel);
    }
    console.log(count+" ====");
    this.props.closePopup();
    this.props.history.push("/group");
    
    
    }

    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <div className="modal-body " >Are you sure to delete?
          <button id="deleteBin" type="button" className="btn  btn-sm btn-info mr-1 ml-1" data-dismiss="modal" onClick={this.deleteBin}>
                            Yes
          </button>
                        <button id="cancelBin" type="button" className="btn btn-sm btn-danger ml-1" data-dismiss="modal" onClick={this.deleteBin}>
                            No
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
      selectedGroupId:state.group.selectedGroupID
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
    mapStateToProps  ,mapDispatchToProps  
  )(withRouter(DeleteBin));