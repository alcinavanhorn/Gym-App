import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';

//Creates a constant for localizer
const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { trainings: [], events: [] }
    }
    
	componentDidMount() {
        this.loadTrainings();
    }
	
	//Fetches trainings from REST API
    loadTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings/')
            .then((response) => response.json())
            .then((responseJSON) => {
                let trainings = responseJSON.filter((item) => {
                    if (!item.customer) {
                        return false;
                    } else {
                    return true;
					}
                })
                this.setState({ trainings })
            })
            .then(() => this.createEvents());
    }

	//"Creates" events for Big Calendar based on the API data
    createEvents = () => {
        let booking = [];
        this.state.trainings.map((item, i) => {
            return booking[i] = {
                id: i,
                title: item.activity + ', ' + item.duration + ' minutes, ' + item.customer.firstname + ' ' + item.customer.lastname,
                start: moment(item.date).toDate(),
                end: moment(item.date).toDate(),
                allDay: true //I couldn't figure out how to add specific times realiably for the trainings with the API provided, so they are set as all day events 
            };
        });
        this.setState({ events: [...booking] });
    }

	//Renders the Big Calendar component with the fetched data
    render() {
        return (
            <div id="calendar">
                <BigCalendar
                    localizer={localizer}
                    events={this.state.events}
                    defaultDate={new Date()}
                />
            </div>
        )
    }
}

export default Calendar;