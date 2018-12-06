import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { ToastContainer, toast } from 'react-toastify';

import AddCustomer from './AddCustomer';

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
	
	//Update customer
	updateCustomer(customer, link) {
		fetch(link, 
		{	method: 'PUT', 
			headers:	{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customer)
		})
		.then(
			toast.success("Update successful", {
				position: toast.POSITION.BOTTOM_LEFT
			})
		)
		.catch(err => console.error(err))
	}
	
	//Delete customer
	onDelClick = (idLink) => {
		confirmAlert({
			title: '',
			message: 'Do you want to delete this customer?',
			buttons: [
			{
			label: 'Ok',
			onClick:() => {
            fetch(idLink, {method: 'DELETE'})
			.then(res => this.loadCustomers())
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
	
	//Create new customer
	addCustomer(customer) {
		fetch('https://customerrest.herokuapp.com/api/customers',
		{	method: 'POST',
			headers:	{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(customer)
		})
		.then(res => this.loadCustomers())
		.catch(err => console.error(err))
	}
	
  renderEditable = (cellInfo) => {
    return (
	<div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
			const data = [...this.state.customers];
			data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
			this.setState({ customers: data });
        }}
        dangerouslySetInnerHTML={{
			__html: this.state.customers[cellInfo.index][cellInfo.column.id]
        }}                
		/>
	);
	}
	
	render() {
		return (
		<div className="App-body">
			<div className="row">
				<AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
			</div>

		<ReactTable data={this.state.customers}
		columns={[
			{
				columns: [
				{
					accessor: "links[0].href",
					show: false
				},
				{
					Header: "First name", 
					accessor: "firstname",
					Cell: this.renderEditable
				},
				{
					Header: "Last name", 
					accessor: "lastname",
					Cell: this.renderEditable
				},
				{
					Header: "Street address", 
					accessor: "streetaddress",
					Cell: this.renderEditable
				},
				{
					Header: "Post code", 
					accessor: "postcode",
					Cell: this.renderEditable
				},
				{
					Header: "City", 
					accessor: "city",
					Cell: this.renderEditable
				},
				{
					Header: "Email", 
					accessor: "email",
					Cell: this.renderEditable
				},
				{
					Header: "Phone", 
					accessor: "phone",
					Cell: this.renderEditable
				},
				{
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value, row}) => (<button className="btn btn-default btn-link" onClick={()=>{this.updateCustomer(row, value)}}>Save</button>)
                },              
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-default btn-link" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
                }              
			]
		}
		]}
		filterable
		className="-highlight" >
		</ReactTable>
		<ToastContainer autoClose={2000} />
	</div>
	);
	}
}

export default Customerlist;
