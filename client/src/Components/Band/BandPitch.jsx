import React from 'react';
// import ProgressComponent from './ProgressComponent';
import Datetime from 'react-datetime';

export default class BandPitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    

    render() {
        return (
            <div className="container container-fluid border p-3 small">
                <div className="row">
                {/* <div className="container-fluid border p-3 small"> */}
                    <div className="col-sm">
                        <div className="form-inline">
                          {/* <div className="col col-md-auto"> */}
                          <div>
                            <label for="exampleInputEmail1" className="text-left">Location</label>
                          </div>
                          {/* </div> */}
                          {/* <div className="col "> */}
                          
                            <input type="email" className="form-control mt-1 form-control-sm justify-content-end" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                          {/* </div> */}
                        </div>
                        <div className="form-inline">
                          {/* <div className="col col-md-auto"> */}
                            <label for="exampleInputEmail1">Available Dates</label>
                          {/* </div> */}
                          {/* <div className="col"> */}
                            <Datetime />
                          {/* </div> */}
                        </div>
                        <div className="form-inline ">
                          {/* <div className="col col-md-auto"> */}
                          <label for="exampleInputEmail1">Notes</label>
                            <input type="email" class="form-control mt-1 form-control-sm  justify-content-end" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>

                    </div>
                    <div className="col-sm text-right">
                        <div className="form-inline">
                            {/* <div className="col col-6"> */}
                              <label for="exampleInputEmail1" className="text-left">Commits Needed</label>
                            {/* </div> */}
                            {/* <div className="col"> */}
                              <input type="email" className="form-control mt-1 form-control-sm justify-content-right" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            {/* </div> */}
                        </div>
                        <div className="form-inline">
                          {/* <div className="col"> */}
                            <label for="exampleInputEmail1">By</label>
                            {/* <div className="col align-self-end text-right"> */}
                            <Datetime />
                          {/* </div> */}
                        </div>
                        <div className="button-block">
                          <button type="submit" class="btn btn-secondary">Submit</button>
                        </div>
                    </div>
                </div> 
              </div>
            // </div>

        )
    } 
}
