import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';
import Navigator from './components/Navigator';
import Home from './components/Home';
import Login from './components/Login';
import { firebaseAuth } from './config';

//Creates PrivateRoute that allows authentication for routes so unauthenticated users cannot use them
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render = {props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

//Sets the initial state for the user as null and sets them as unauthenticated
class App extends Component {
	constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated : false};
	}

//Sets up Firebase authentication where if user and email are verified, the user is set as authenticated
  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });      
      } 
      else {
        this.setState({ user: null, isAuthenticated: false });      
      }
    });
}
//Renders the webpage routes, some of which require authentication before accessing
  render() {
    return (
      <div className="App">
        <header className="App-header">
		<h1>Gym App</h1>
		</header>
		<BrowserRouter>
			<div>
			<Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/customers" component={Customerlist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/trainings" component={Traininglist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path = "/calendar" component={Calendar} />
              <Route path="/login" component={Login} />
			</Switch>
			</div>
		</BrowserRouter>
      </div>
    );
  }
}

export default App;
