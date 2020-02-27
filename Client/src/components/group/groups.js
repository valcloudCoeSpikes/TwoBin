import React from 'react';
import '../../css/groups.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { createBrowserHistory } from "history";
import { ai } from '../util/telemetryService';
import { SeverityLevel } from '@microsoft/applicationinsights-web';

const history = createBrowserHistory({ basename: '' });
ai.initialize({ history: history });


class Groups extends React.Component {

    componentDidMount() {
        let propsHistory = this.props.history;
        if (!this.props.groupsList.length) {
            fetch("https://twobinlabel.azurewebsites.net/api/v1/groups/all").then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (!result.length && result.status !== 200) {
                        throw Error(result.status + " - " + result.error + " - " + result.message );
                    }
                    this.props.storeGroupsList(result)
                })
                .catch(function (e) {
                    ai.appInsights.trackException({ error: new Error(e), severityLevel: SeverityLevel.Error });
                    propsHistory.push('/error')
                })
        }
    }
    navigateToDetails = (e) => {
        this.props.saveSelectedGroup(e.target.innerText);
        this.props.history.push('/groupDetails')
    }
    render() {
        return (

            <table frame="box" align="center" className="table-striped table-sm">
                <thead>
                    <tr>
                        <th className="th-group">&nbsp;&nbsp;Select a group to manage from the list below&nbsp;&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.groupsList.map((group, index) =>
                            <tr key={index}>
                                <td >
                                    <span className="group" onClick={this.navigateToDetails}>{group.groupName}</span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state) {
    return {
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Groups));
