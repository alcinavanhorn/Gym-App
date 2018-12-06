import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Customerlist extends Component {
	state = { customers: [] };
	
	componentDidMount() {
		this.loadCustomers();
	}
	
	//Load customers from REST API
	loadCustomers = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
		.then((response) => response.json())
		.then((responseData) => {
			this.setState({
				customers: responseData.content,
		});
		})
	}
	
	render() {
		return (
		<div className="App-body">
		<ReactTable data={this.state.customers}
		columns={[
			{
				columns: [
				{
					accessor: "_links.self.href",
					show: false
				},
				{
					Header: "First name", 
					accessor: "firstname",
				},
				{
					Header: "Last name", 
					accessor: "lastname",
				},
				{
					Header: "Street address", 
					accessor: "streetaddress",
				},
				{
					Header: "Post code", 
					accessor: "postcode",
				},
				{
					Header: "City", 
					accessor: "city",
				},
				{
					Header: "Email", 
					accessor: "email",
				},
				{
					Header: "Phone", 
					accessor: "phone",
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

export default Customerlist;
