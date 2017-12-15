import React from 'react';
import ProgressComponent from './ProgressComponent';
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { commitToEvent, uncommitFromEvent, fetchAllUsers } from '../../actions/index';
import ShowcaseInfo from '../ShowDescription';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

class UpcomingGig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changed: false,
            usercommitment: this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0] ? 
                    this.props.attendance.filter((x) => x.ShowcaseId === this.props.gig.id)[0].commitValue : 0,
            usercommitted: this.props.usercommitted,
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.state.changed) this.setState({
          usercommitted: this.props.usercommitment,
        })
      }

      openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

      renderCommitmentForm(){
        if (!this.state.usercommitment) { 
            return(
                <form>
                    <input id="commits" 
                        type="number"
                        defaultValue={this.state.value}
                        onChange={(e) => {
                            this.setState({formvalue: e.target.value})
                        }} />
                    {this.renderButton()}
                </form>    
            )
        } else {
            return(
                <div> 
                    <div>
                        {`User commitment: $ ${this.state.usercommitment ? this.state.usercommitment : 0}`}
                    </div>
                    <div>
                        {this.renderButton('committed')}
                    </div>
                </div>
            )
        }
    };


    renderButton(status) {
        if (status !== 'committed') {
            return (<div className="m-1">
                        <button type="submit" 
                            key={this.props.gig.id}
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Pitch In
                        </button>
                    </div>
            )
        } else {
            return (<div className="m-1">
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={(e) => {
                                this.handleSubmit(e)} }>
                            Withdraw Funding
                        </button>
                    </div>)
        }
    };
    
    handleSubmit(e) {
        if (this.state.usercommitment) {
            this.uncommitButton(e, this.props.info.id, this.props.gig.id, 0)
        } else {
            this.commitButton(e, this.props.info.id, this.props.gig.id, this.state.formvalue)
        }
    }

    commitButton(e, user, gig, amount) {
        this.props.onCommitClick(user, gig, amount)
        this.setState({
            usercommitment: parseInt(amount,10) ? parseInt(amount,10) : 0, 
            usercommitted: true,
            changed: true
        })
    }

    uncommitButton(e, user, gig) {
        this.props.onUncommitClick(user, gig)
        this.setState({usercommitment: 0, usercommitted: false, changed: true})
    }

    render() {
        console.log('re-render: ========================')
        console.log('Upcoming Gig this.props: ', this.props);
        console.log('Upcoming Gig this.state: ', this.state);
        
        if (this.props.users.length > 0) {
            return (
                <div className="container border p-3 m-1 small" key={this.props.gig.id}>
                    <div className="potential-gig-wrapper">
                        <div className="potential-gig-band-name">
                          <Link to={`/bandprofile/${this.props.gig.id}`}>
                            <h5>{this.props.users.filter((x) => x.id = this.props.gig.id)[0].name}</h5>
                          </Link>
                          <div>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                               >

                            {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
                            <button onClick={this.closeModal}>close</button>
                          
                           <ShowcaseInfo showId={this.props.gig.id} />
                            </Modal>
                          </div>
                        </div>
                        <a><h4 className="potential-gig-event-name" onClick={this.openModal}>
                       
                            {this.props.gig.name}
            
                        </h4></a>

                        <div className="potential-gig-daterange">
                          {/* {this.props.gig.final_commit_date}<br /> */}
                          {/* {this.props.gig.venue_id}<br /> */}
                          Venue Placeholder<br />
                          Doors @ {this.props.gig.start_time}
                        </div>
                        <div className="text-success potential-gig-commit-number">
                          {this.props.gig.city}<br />
                            Fully Commited 🎉
                        </div>
                        <div className="potential-gig-progress-bar">
                          <ProgressComponent percent={100} />
                        </div>
                        <div className="potential-gig-commit-button">
                            {this.renderCommitmentForm()}
                        </div>
                    </div>
                    
              </div>)
        } else {
            return(<div></div>)
        }
    } 
}

function mapStateToProps({ auth, attendance, users, info }){
    return { 
      attendance: attendance,
      auth: auth,
      users: users,
      info: info
    }
  }


  const mapDispatchToProps = dispatch => {
    return {
      onCommitClick: (user, gig, amount) => {
        dispatch(commitToEvent(user, gig, amount ? amount : 0))
      },
      onUncommitClick: (user, gig) => {
        dispatch(uncommitFromEvent(user, gig))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingGig);