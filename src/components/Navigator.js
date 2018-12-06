import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../config';

class Navigator extends Component {
  logout = () => {
    return firebaseAuth().signOut()
  }  

  render() {
    let logLink = null;
    if (this.props.isAuthenticated)
      logLink = <button className="btn btn-link" onClick={this.logout}>Logout</button>;
    else
      logLink = <Link className="nav-link" to="/login">Login</Link>;

    return (
      <div>
      <nav>
        <div>
          <ul className="Nav-ul">
            <li className="Nav-li">
              <Link to="/customers">Customers</Link>
            </li>
            <li className="Nav-li">
              <Link to="/trainings">Trainings</Link>
            </li>
			<li className="Nav-li">
              <Link to="/calendar">Calendar</Link>
            </li>
          </ul>
        </div>
		<button className="btn btn-link Nav-logout" onClick={this.logout}>Logout</button>
      </nav>        
      </div>
    );
  }
}

export default Navigator;