import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../../css/error.css'
class ErrorPage extends React.Component {
    
    render() {
        return (
            <div className="alert alert-danger text-center">
                       {/* {this.props.match.params.msg} // access the paramater */}
                        <p className="text-danger">
                            <br/><strong>
                             An error has occured @ {new Date().toLocaleString()} <br/>
                             We could not serve your request currently! <br/>
                             Please try again later.<br/>
                                 </strong>
                            </p>
                            <div className="error-actions">
                                 <Link to="/home" className="btn btn-dark"><span className="fa fa-fw fa-home"> </span>Take Me Home</Link>
                          </div>
            </div>
        )
    }
}

export default withRouter(ErrorPage);