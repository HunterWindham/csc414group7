import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componets/LandingPage';
import AddApparel from './Componets/AddApparel'
import Login from './Componets/Login'
import Dashboard from './Componets/Dashboard'
import EditApparel from './Componets/EditApparel'
import Register from './Componets/Register'
import WaitForItComponent from './Componets/WaitRegistrationConfirmation'
import UserDashboard from './Componets/UserDashboardView'
import DashUser from './Componets/DashUserView'
import EditProfile from './Componets/EditBioInformation'
import AdminView from './Componets/AdminView'

import { GlobalHistory } from './history';


import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  Router,
} from 'react-router-dom';



class AppComponent extends React.Component{

render(){
return(
<BrowserRouter>
<div>
	<GlobalHistory />
	<Route exact path="/" component={App}/>
	<Route path="/dashboard" component={App} />
	<Route path="/register" component={Register}/>
	<Route path="/login" component={Login}/>
	<Route path="/profile" component={Dashboard}/>
	<Route path="/addApparel" component={AddApparel} />
	<Route path="/editApparel" component={EditApparel} />	
	<Route path="/userprofile" component={DashUser} />
	<Route path="/editprofile" component={EditProfile} />
	<Route path="/waitforit" component={WaitForItComponent} />
	<Route path="/admin" component={AdminView}/>	
	</div>
</BrowserRouter>

);

}


}


ReactDOM.render(<AppComponent/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
