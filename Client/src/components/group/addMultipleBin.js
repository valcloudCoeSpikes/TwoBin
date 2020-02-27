import React from 'react'
import SubNavBar from './subNavBar';
import '../../css/addMultipleBins.css'

class AddMultipleBins extends React.Component {
    render() {
        return (
            <div>
                <SubNavBar />
                <p className="span">Paste Bins information Below :</p>
                <hr />
                <div>
                    <label className="included-bin-id">Included Bin ID's</label>
                    <input type="checkbox" />
                </div>
                <textarea className="form-control mx-auto" rows="3"></textarea>
                <div>
                <button className="btn btn-outline-secondary ml-2 btn-sm addbin" type="submit">Add Bin</button> 
                </div>
            </div>
        )
    }
}

export default AddMultipleBins;