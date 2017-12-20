import React from 'react';
// import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import ProgressComponent from './ProgressComponent';
//import moment from 'moment'
//import Datetime from 'react-datetime';
// import DateRangePickerWrapper from './DateRangePickerWrapper';
import SingleDatePicker from './SingleDatePicker';

//import * as actions from '../../actions'
//import { networkInterfaces } from 'os';

// const validate = values => {
//   console.log("VALIDATE VALUES: ", values);
//   const errors = {}
//   if (!values.eventName) {
//     errors.name = 'Required'
//   } 
//   return errors
// }


const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  // console.log("RENDERFIELD: input: ", input, " label: ", label, " type: ", type)
  return (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)}


let BandPitch = props => {

// const renderDates = fields => {
//   // console.log("DATESSSS ARGS: ",fields);
//   return  (
//   <div>    
//   <DateRangePickerWrapper
//   startDateFieldName="start"
//   endDateFieldName="end"
//   {...fields}
// />
// </div>
// )};
const renderDate = ({ input, label, type, meta }) => {
  return (
  <SingleDatePicker
    date={input.value}
    focused={meta.active}
    onDateChange={value => input.onChange({ value })}
    onFocusChange={({ focused }) => input.onFocus({ focused })}
    dateGrab={props.dateGrab}
  />
)};

  return (
    
    <div className="d-s-form" >
      
          <div className="col-sm">
            <form  onSubmit={props.handleSubmit} >
            <div className="form-divs">
              <div className="event-deets">
                <div className="e-name">
                  <label>Event Name</label>
                    <Field
                      name="eventName"
                      component={renderField}
                      // component="input"
                      type="text"
                      // label="Event Name"
                      placeholder="D-lon Musk "
                    />
                </div>
                <div className="e-date">
                  <label>Event Date</label>
                    <Field
                    name="startDate"
                    component={renderDate}
                    type="date"
                    // normalize={normalizeDate}
                    // format={formatDate}
                  />
                </div>
                <div className="e-descrip">
                    <label>Event Description</label>
                      <Field
                        name="eventDescription"
                        component="input"
                        // label="Event Description"
                        type="text"
                        placeholder="Describe your event.. "
                      />
                </div>
              </div>
              <div className="start-time">
                <label>Show Starts</label>
                    <Field
                      name="startTime"
                      component="input"
                      type="text"
                      placeholder="8:00 PM"
                    />
              </div>
              <div className="venue-deets">
                <div className="v-has-venue">  
                  <label htmlFor="hasNoVenue">Check box if there is NOT a planned venue for your event?</label>
                    
                      <Field 
                      name="hasNoVenue" 
                      id="hasNoVenue" 
                      component="input" 
                      type="checkbox"/>
                </div>
                <div className="v-name">
                  <label>Venue Name</label>  
                      <Field
                        name="venueName"
                        component="input"
                        // label="Venue Name"
                        type="text"
                        placeholder="My Garage "
                      />
                </div >
                <div className="v-descrip">
                  <label>Venue Description</label>
                      <Field
                        name="venueDescription"
                        component="textarea"
                        // label="Venue Description"
                        // type="text"
                        placeholder="My Garage "
                      />
                </div>
                <div className ="v-location">
                  <div className="v-address">
                    <label>Venue Street Address</label>
                      <Field
                        name="address"
                        component="input"
                        // label="City"
                        type="text"
                        placeholder="123 Road St"
                      />
                  </div>
                  <div className="v-city">
                    <label>City</label>
                      <Field
                        name="city"
                        component="input"
                        // label="City"
                        type="text"
                        placeholder="New York "
                      />
                  </div>
                  <div className="v-state">
                    <label>State</label>
                      <Field
                        name="state"
                        component="input"
                        type="text"
                        placeholder="NY"
                      />
                  </div>
                  <div className="v-zip">
                    <label>Zip Code</label>
                      <Field
                        name="zip"
                        component="input"
                        type="integer"
                        placeholder="12345"
                      />
                  </div>
              </div>
              <div className="end-deets">
                <div className="end-is-committed">
                  <label htmlFor="isCommitted">Check Box If Your Event Already Confirmed</label>
                  <div>
                    <Field name="isCommitted" id="isCommitted" component="input" type="checkbox"/>
                  </div>
                </div>
                <div className="end-min-val">
                  <label>Minimum $ To Have The Event</label>
                    <Field
                      name="minCommits"
                      component="input"
                      type="integer"
                      placeholder="10"
                    />
                </div>
                <div className="end-pitch">
                  <label>Suggested Pitch In($)</label>
                    <Field
                      name="price"
                      component="input"
                      type="integer"
                      placeholder="5"
                    />
                </div>
                <div className="end-phone">
                  <label>Want us to send you text updates on your event?
                    Add a phone number</label>
                    <Field
                      name="phone"
                      component="input"
                      type="string"
                      placeholder="512-920-8543"
                    />
                </div>
              </div>
              <div className="submit-button">
                <button type="submit" >Submit</button>
              </div>
              </div>
            </div> 
            </form>
          </div>         
      </div>

  )
} 

BandPitch = reduxForm({
  form: 'pitchGigForm'
  // validate
})(BandPitch);

export default BandPitch;
