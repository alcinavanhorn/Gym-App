import React from 'react';
import SkyLight from 'react-skylight';

class AddCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
	}
	
	handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
	handleSubmit = (event) => {
		event.preventDefault();
		var newCustomer = {firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone};
		this.props.addCustomer(newCustomer);
		this.props.loadCustomers();
		this.refs.simpleDialog.hide();
		
	}
	
	render() {
		const addCustomerDialog = {
			width: '70%',
			height: '450px', 
			marginTop: '-300px',
			marginLeft: '-35%',
		};
		
	return (
		<div>
			<SkyLight dialogStyles={addCustomerDialog} hideOnOverlayClicked ref="simpleDialog">
				<div className="card" style={{"width": "95%"}}>
				<div className="card-body">
				<h5 className="card-title">New customer</h5>
				<form>
					<div className="form-group">
						<input type="text" placeholder="First name" className="form-control" name="firstname" onChange={this.handleChange}/>    
					</div>
					<div className="form-group">       
						<input type="text" placeholder="Last name" className="form-control" name="lastname" onChange={this.handleChange}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Street address" className="form-control" name="streetaddress" onChange={this.handleChange}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Post code" className="form-control" name="postcode" onChange={this.handleChange}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="City" className="form-control" name="city" onChange={this.handleChange}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Email" className="form-control" name="email" onChange={this.handleChange}/>
					</div>
					<div className="form-group">
						<input type="text" placeholder="Phone" className="form-control" name="phone" onChange={this.handleChange}/>
					</div>

					<div className="form-group">
						<button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
					</div>       
				</form>
				</div>      
				</div>
			</SkyLight>
		<div className="col-md-2">
			<button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New customer</button>
        </div>
      </div>   
    );
  }
}

export default AddCustomer;

