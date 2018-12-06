import React from 'react';
import SkyLight from 'react-skylight';

class AddTraining extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: '', duration: '', activity: '',  customer: ''};
	}
	
	handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }    
  
	handleSubmit = (event) => {
		event.preventDefault();
		var newTraining = {date: this.state.date, duration: this.state.duration, activity: this.state.activity, customer: this.state.customer};
		this.props.addTraining(newTraining);
		this.props.addTraining();
		this.refs.simpleDialog.hide();
		
	}
	
	render() {
		const addTrainingDialog = {
			width: '70%',
			height: '450px', 
			marginTop: '-300px',
			marginLeft: '-35%',
		};
		
	return (
		<div>
			<SkyLight dialogStyles={addTrainingDialog} hideOnOverlayClicked ref="simpleDialog">
				<div className="card" style={{"width": "95%"}}>
				<div className="card-body">
				<h5 className="card-title">New training</h5>
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
						<input type="text" placeholder="Customer link" className="form-control" name="customer" onChange={this.handleChange} />
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

