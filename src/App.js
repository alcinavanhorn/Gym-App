import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
		<BrowserRouter>
			<div>
			<Link to="/customers">Customers</Link>{' '}
			<Link to="/trainings">Trainings</Link>{' '}
			<Switch>
				<Route path="/customers" component={Customerlist} />
				<Route path="/trainings" component={Traininglist} />
			</Switch>
			</div>
			</BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
