import React from 'react';
import UpcomingGig from './UpcomingGig';
import PotentialGig from './PotentialGig';
import { connect } from 'react-redux';
import { fetchEvents, checkAttendance, fetchAllUsers } from '../../actions/index';
import Map from '../googleMaps';
import Board from './reviewBoard';
import axios from 'axios';


class UserDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          locations:[],
          show: false,
          dashNav:'upcoming',
        };

        this.props.init();
        this.changeState = this.changeState.bind(this);
        this.onClick = this.onClick.bind(this)

       
    }
    onClick(e){
      e.preventDefault()
      this.setState({
        dashNav: e.target.value
      })
    }
    
    componentWillRecieveProps() {
      (this.props.init());
    }

    
    fetchEvents(e) {
      e.preventDefault();
      this.props.onFetchClick();
    }  

    componentDidMount() {
          if(this.props.events){
            this.props.events.map((place, id) => {
                  
                return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place.address},%20NY%2010017&key=AIzaSyCn1886_Sxx7XVDi4xAjhKCKigLJyoxtvU`)
                  .then(res => this.state.locations.push([res.data.results[0].geometry.location, place, {showInfo: false}]))
          
                })
          }
        }

    changeState(info){
          // info = false;
          this.setState({
            show:true
          })
        }

    renderContent(){

      let userAttendance = this.props.attendance.length > 0 ? 
      this.props.attendance
      .filter((x) => x.UserId === this.props.info.id) 
      .map((x) => x = x.ShowcaseId) : [];

      switch(this.state.dashNav){
        case 'upcoming':
          return(
                  <div> 
                    <h2>Upcoming Gig'em Shows</h2>
                    <div className="user-show-scroll">
                    {this.props.events
                      .filter((x) => x.isCommitted === true)
                      .map((x) => <UpcomingGig user={this.props.info.id} key={x.id} gig={x}/>)
                    }
                    </div>
                  </div>
                  );
        case 'potential':
          return(
                  <div>
                    <h2>Potential Gigs</h2>
                    <div className="user-show-scroll">
                      { this.props.events
                          .filter((x) => x.isCommitted === false)
                          .map((x) => <PotentialGig 
                            user={this.props.info.id} 
                            users={this.props.users}
                            key={x.id} 
                            gig={x} 
                            attendance={this.props.attendance}
                            usercommitted={userAttendance.includes(x.id)} />)
                      }
                    </div>   
                               
                  </div>
                );
        case 'chat':
          return (
            <div>
                   <Board />      
             </div>
          );
          default:
          return;
      }
    }
    
    render() { 
  
      return (
        <div >   
            <div> 
                <button className="" type="submit" value="upcoming" onClick={this.onClick}>Upcoming Gigs</button>
                <button className="" type="submit" value="potential" onClick={this.onClick} >Potential Gigs</button>
                <button className=""type="submit" value="chat" onClick={this.onClick}>Community Board</button>
              </div>
              <div className="user-dashboard">
              {this.renderContent()}
              <div>
              <div className="google-maps">
                    {/* <div></div> */}
                    <div className="inside-map">
                      <Map
                      
                        show={this.changeState}
                        geoLoc={this.state.locations}  
                        center={{lat:40.728199 , lng:-73.9894738}}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `200%`}}/>}   
                        />  
                      </div>    
                      {/* <div></div> */}
              </div>
              </div>
              </div>
        </div>
      )
    }
}

function mapStateToProps({ events, auth, attendance, info, users }){
  return { 
    attendance: attendance,
    events: events,
    auth: auth,
    info: info, 
    users: users
  }
}

const mapDispatchToProps = dispatch => {
  //console.log('mapdispatch to props: ', dispatch);
  return {
    init: () => {
      dispatch(fetchEvents())
      .then(() => dispatch(checkAttendance()))
      .then(() => dispatch(fetchAllUsers()))
    },
    onFetchClick: id => {
      //console.log('onFetchClick id: ', id)
      dispatch(fetchEvents());
    },
    checkAttendanceDispatch: (user) => {
      dispatch(checkAttendance())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
