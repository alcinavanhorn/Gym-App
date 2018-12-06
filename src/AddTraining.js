import React from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: '', duration: '', activity: '',  customer: ''};
	}
	
	//Manages changes in the input field
	handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
	}    
	
	//Manages the user inputted data to create a new training
	handleSubmit = (event) => {
		event.preventDefault();
		var newTraining = {date: this.state.date, duration: this.state.duration, activity: this.state.activity, customer: this.state.customer};
		this.props.addTraining(newTraining);
		this.props.addTraining();
		this.refs.simpleDialog.hide();
	}
	
	//Sets up the dialog box for Skylight to use
	render() {
		const addTrainingDialog = {
			width: '70%',
			height: '25%', 
			marginTop: '-300px',
			marginLeft: '-35%',
		};
		
	//Shows the Skylight dialog box and form
	return (
		<div>
			<SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialog">
				<div style={{"width": "95%"}}>
				<div>
				<h5>New training</h5>
				<form>
					<div className="form-group">
						<input type="text" placeholder="Date (YYYY-MM-DD)" className="form-control" name="date" onChange={this.handleChange} />    
					</div>
					<div className="form-group">       
						<input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange} />
					</div>
					<div className="form-group">
						<input type="text" placeholder="Customer Reference Link" className="form-control" name="customer" onChange={this.handleChange} />
					</div>

					<div className="form-group">
						<button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>   
					</div>       
				</form>
				</div>      
				</div>
			</SkyLight>
		<div className="col-md-2">
			<button style={{'margin': '10px'}} className="btn btn-primary" onClick={() => this.refs.simpleDialog.show()}>New training</button>
        </div>
      </div>   
    );
  }
}

export default AddTraining;

