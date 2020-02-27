import React from 'react'
import '../../css/printLabel.css'

class PrintLabel extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <table className="table-printlabel text-centered mx-auto">
                    {/* <thead>
                        <tr>
                            <td><a href="#"><span>Print Many Horizontal Labels</span></a></td>
                            <td><a href="#"><span>Print Many Vertical Labels</span></a></td>
                        </tr>
                    </thead> */}
                    <tbody>
                        <tr>
                            <td><a href="#">Print Many Horizontal Labels</a></td>
                            <td><a href="#">Print Many Vertical Labels</a></td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="singleBin"
                                    className="col-sm-0 col-form-label"
                                >
                                    Single Bin
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="singleBin"
                                    className="form-control form-control-sm col-sm-5"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="horizontal" ></input>
                                <label htmlFor="horizontal">Horizontal</label>
                            </td>
                            <td>
                                <input type="radio" id="vertical"  ></input>
                                <label htmlFor="vertical">Vertical</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="upper"
                                    className="col-sm-0 col-form-label"
                                >
                                    Upper
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="upper"
                                    className="form-control form-control-sm col-sm-5"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="lower"
                                    className="col-sm-0 col-form-label"
                                >
                                    Lower
                                </label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="lower"
                                    className="form-control form-control-sm col-sm-5"
                                />
                            </td>
                        </tr>
                        <tr align="center">
                           
                                <button
                                    className="btn btn-outline-secondary mb-2 btn-sm addbin"
                                    type="submit"
                                >
                                    Continue
                                </button>
                           
                        </tr>
                    </tbody>
                </table>
                {/* <div className="mt-2">
                    <button
                        className="btn btn-outline-secondary mb-2 btn-sm addbin"
                        type="submit"
                    >
                        Continue
            </button>
                </div> */}
            </div>

        )
    }
}

export default PrintLabel;