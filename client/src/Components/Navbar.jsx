import React from 'react';

import {
  // BrowserRouter as Router,
  // Route,
  Link
} from 'react-router-dom'

import { connect } from 'react-redux';
import { /* fetchUser, fetchUserProfile, fetchEvents, checkAttendance, */ fetchUserProfile } from '../actions/index';



class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchProfile(this.props.auth);
  }
    
    renderContent(){
      switch(this.props.auth){
        case null:
          return;
        case false:
          return(
            <div>
              {/* <td> */}
                <a href="/auth/google"><button className="btn btn-danger my-2 my-sm-0" type="submit">Login With Google</button></a>
            </div>
          );
        default:
          return (
            <div>

                  <a href="/api/logout"><button className="btn btn-danger my-2 my-sm-0" type="submit">Logout</button></a>
          </div>
          )
      }
    }


    render() {
      console.log('navbar props', this.props)
      if (this.props.info.isBand) {
        return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light ">
        {/* <a className="navbar-brand">Navbar</a> */}
        <Link to="/">
          <img src="../Assets/party.svg" width="40px" height="40px" alt="User Logo" />
        </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link">
              <h1>Gig'em Band: {this.props.info.name ? this.props.info.name : 'Anonymous User'}</h1>
              <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <table>
            <tbody>
              <tr>
              <td>
                <Link to="/band/upcoming">
                  <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">Upcoming Gigs</button>
                </Link>
                <Link to="/band/finalize">
                  <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">Gigs to Finalize</button>
                </Link>
                <Link to="/band/potential">
                  <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">Potential Gigs</button>
                </Link>
                <Link to="/band/pitch">
                  <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">Pitch a Gig</button>
                </Link>
                <Link to={`/bandprofile/${this.props.info.id}`}>
                  <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">My Profile</button>
                </Link>
              </td>
                <td>
                 {this.renderContent()}
                </td> 
              </tr>
            </tbody>
          </table>
        </div>
      </nav>
    </div>)
      } else {
        return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand">Navbar</a> */}
            <Link to="/">
              <img src="./Assets/party.svg" width="40px" height="40px" alt="User Logo" />
            </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link">
                
                  <h2>{this.props.info.name ? `Welcome, ${this.props.info.name}` : 'Anonymous User'}</h2>

                  {/* <h1>{this.props.info.name ? this.props.info.name : 'Anonymous User'}</h1> */}
                  <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
              <table>
                <tbody>
                  <tr>
                  <td>
                    <Link to="/user">
                    </ Link>
                    <Link to="/userprofile">
                      <button className="btn btn-primary my-2 my-sm-0 m-1" type="submit">My Profile</button>
                    </Link>
                  </td>
                    <td>
                     {this.renderContent()}
                    </td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </nav>
        </div>
)
    }
}
}
function mapStateToProps({ auth, info, users }){
    return { 
      auth: auth,
      info: info,
      users: users
      //userInfo: 'info'
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: (googleId) => {
      dispatch(fetchUserProfile(googleId))
    },
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Navbar);

