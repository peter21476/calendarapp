import React from 'react'
import { format } from 'date-fns'
import Logo from '../images/bizzabo-logo.jpg'

const CalendarItem = (props) => {

    let eventPhoto = '';

    if (props.eventPhoto === undefined) {
        eventPhoto = Logo
    }

    else {
        eventPhoto = props.eventPhoto
    }

    let photoStyling = {
        backgroundImage: `url("${eventPhoto}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <div key={props.eventId} className="col-lg-4 col-md-12 mb-5">
            <div className="event-wrapper">
                <p className="event-type">{props.eventType}</p>
                <div className="event-photo" style={photoStyling}></div>
                <div className="event-details">
                    <div className="event-name"><h5>{props.eventName}</h5></div>
                    <h6>{format(new Date(props.eventStartDate), 'MMMM d, yyyy')} - {format(new Date(props.eventEndDate), 'MMMM d, yyyy')}</h6>
                </div>
                <div className="event-registration">
                    <a className="btn btn-register" href={props.eventURL} target="_blank">REGISTER</a>
                </div>
            </div>
        </div>
    )
}

export default CalendarItem
