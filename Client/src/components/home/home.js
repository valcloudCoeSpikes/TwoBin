import React from 'react';
import '../../css/home.css'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                
                    <div className="jumbotron jumbotron-tb text-left">
                       <h2>Welcome to Two Bin Label </h2>
                    </div>
                    
                        <div className="alert alert-info text-left">
                       
                        <p className="text-success">
                            <br/><strong>
                            <u>Breif description on the application:</u><br/><br/></strong>
                            <strong><u>Home</u></strong> screen, What it performs
                            <br/>
                            <strong><u>Group</u></strong> screen, What it performs
                            <br/>
                            <strong><u>More Actions</u></strong> screen, What it performs

                        </p>
                    </div>

                </div>
            

           
                    )
                }
}