import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';

import AddTraining from './AddTraining'

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
	
	//Update training (only duration and activity are updateable)
	updateTraining(training, link) {
		fetch(link, 
		{	method: 'PUT', 
			headers:	{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(training)
		})
		.then(
			toast.success("Update successful", {
				position: toast.POSITION.BOTTOM_LEFT
			})
		)
		.catch(error => console.error(error))
	}
	
	//Delete training
	onDelClick = (idLink) => {
		confirmAlert({
			title: '',
			message: 'Do you want to delete this training?',
			buttons: [
			{
			label: 'Ok',
			onClick:() => {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${idLink}`, {method: 'DELETE'})
			.then(res => this.loadTrainings())
			.catch(err => console.error(err))

			toast.warn("Successfully deleted", {
				position: toast.POSITION.BOTTOM_LEFT
          });
          }},
        {
          label: 'Cancel',
        }
      ]
    })
	}
	
	//Create new training. Adds it to the API, but page has to be refreshed after submitting for the new training to show up. 
	//Uses the same method as creating a new customer, which works better, so problem unclear
	addTraining(training) {
		fetch('https://customerrest.herokuapp.com/api/trainings/',
		{	method: 'POST',
			headers:	{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(training) 
		})
		.then(res => this.loadTrainings())
		.catch(err => console.error(err))
	}
	
	//Makes the ReactTable cells editable
	renderEditable = (cellInfo) => {
		return (
			<div
				style={{ backgroundColor: "#fafafa" }}
				contentEditable
				suppressContentEditableWarning
				onBlur={e => {
					const data = [...this.state.trainings];
					data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
					this.setState({ trainings: data});
				}}
				dangerouslySetInnerHTML={{
					__html: this.state.trainings[cellInfo.index][cellInfo.column.id]
				}}
			/>
		);
	}
	
	render() {
		return (
		<div id="trainings">
			<div className="row">
				<AddTraining addTraining={this.addTraining} loadTraining={this.loadTraining} />
			</div>
			
		<ReactTable data={this.state.trainings}
		columns={[
			{
				columns: [
				{
					id: "date",
					Header: "Date", 
					    accessor: date => {
						return Moment(date.date)
						.format("YYYY-MM-DD")
						},
				},
				{
					Header: "Duration", 
					accessor: "duration",
					Cell: this.renderEditable
				},
				{
					Header: "Activity", 
					accessor: "activity",
					Cell: this.renderEditable
				},
				{
					id: 'customer',
					Header: "Customer",
						accessor: name => {
						if (name.customer != null) {
						return name.customer.lastname + ', ' + name.customer.firstname
						} else return (name.customer) }
				},
				{
					id: 'button',
					sortable: false,
					filterable: false,
					width: 100,
					accessor: 'links[0].href',
					Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateTraining(row, value)}}>Save</button>)
                },              
                {
					id: 'button',
					sortable: false,
					filterable: false,
					width: 100,
					accessor: 'id',
					Cell: ({value}) => (<button className="btn btn-default" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
			]
			}
		]}
		filterable
		className="-highlight"
		>
		</ReactTable>
		<ToastContainer autoClose={2000} />
	</div>
	);
	}
}

export default Traininglist;
