import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';

class Traininglist extends Component {
	state = { trainings: [] };
	
	componentDidMount() {
		this.loadTrainings();
	}
	
	//Load trainings from REST API
	loadTrainings = () => {
		fetch('https://customerrest.herokuapp.com/gettrainings')
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				trainings: responseData,
		});
		})
	}
	
	render() {
		return (
		<div className="App-body">
		<ReactTable data={this.state.trainings}
		columns={[
			{
				columns: [
				{
					id: "date",
					Header: "Date", 
					    accessor: date => {
						return Moment(date.updated_at)
						.local()
						.format("DD-MM-YYYY")
					}
				},
				{
					Header: "Duration", 
					accessor: "duration",
				},
				{
					Header: "Activity", 
					accessor: "activity",
				},
				{
					id: 'customerName',
					Header: "Customer",
						accessor: name => {
						if (name.customer != null) {
						return name.customer.lastname + ', '+ name.customer.firstname
						} else return (name.customer) }
			}
			]
			}
		]}
		filterable
		className="-highlight" >
		</ReactTable>
	</div>
	);
	}
}

export default Traininglist;
