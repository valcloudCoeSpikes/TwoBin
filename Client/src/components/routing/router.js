import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Groups from '../group/groups';
import Home from '../home/home';
import GroupsDetails from '../group/groupDetails'
import AddMultipleBins from '../group/addMultipleBin';
import AddBin from '../group/groupDetails/addBin';
import ViewBin from '../group/groupDetails/viewBin';
import ErrorPage from '../generic/error'
import PrintLabel from '../group/printLabel';
import UserProfile from '../myaccount/userprofile';

const Router = () =>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/group' component ={GroupsDetails}/>
        <Route exact path='/groupDetails' component ={GroupsDetails}/>
        <Route exact path='/group/addMultipleBins' component ={AddMultipleBins}/>
        {/* <Route exact path="/group/addBin/:addedit" component={AddBin}/> */}
        <Route exact path="/viewBin" component={ViewBin}/>
        <Route exact path="/error" component={ErrorPage}/>
        <Route exact path="/printlabel" component={PrintLabel}/>
        <Route exact path="/profile" component={UserProfile}/>
        <Route exact path="/group/addBin/:addedit/:binID" component={AddBin}/>
    </Switch>


export default Router;