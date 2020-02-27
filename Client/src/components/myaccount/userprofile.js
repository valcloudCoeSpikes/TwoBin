import React from 'react'
import { getCachedUser } from '../aad/authContext';
import Graph from '../aad/graph';
import '../../css/moreAction.css'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            office: ''
        }
    }
    componentDidMount() {
        this.fetchGroups();
    }

    fetchGroups = () => {
        const userName = getCachedUser().profile.oid;
        Graph.get(`/users/${userName}`)
            .then(response => {
                this.setState({
                    firstName: response.data.givenName,
                    lastName: response.data.surname,
                    email: response.data.mail,
                    mobile: response.data.mobilePhone,
                    office: response.data.officeLocation
                })
            }
            )
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div className="shadow-lg p-3 mb-5 rounded profile-shadow d-flex" >
                <table align="center" className="profile-td">
                    <tbody>

                        <tr>
                            <td>
                                <label
                                    className="col-sm-1 col-form-label"
                                >Firstname </label>
                            </td>
                            <td >{this.state.firstName}</td>
                        </tr>
                        <tr>
                            <td >
                                <label
                                    className="col-sm-1 col-form-label"
                                >Lastname</label>
                            </td>
                            <td >{this.state.lastName}</td>
                        </tr>
                        <tr>
                            <td >
                                <label
                                    className="col-sm-1 col-form-label"
                                >Email</label>
                            </td>
                            <td >{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    className="col-sm-1 col-form-label"
                                >Mobile</label>
                            </td>
                            <td>{this.state.mobile}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        )

    }

}

export default UserProfile;