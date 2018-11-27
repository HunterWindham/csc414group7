import React
from 'react';

import PropTypes from 'prop-types';

import classNames
from 'classnames';

import { 
withStyles } from 
'@material-ui/core/styles';

import MenuItem
from '@material-ui/core/MenuItem';

import TextField
from '@material-ui/core/TextField';

import Button
from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';

import { push } from 'react-router-redux'

import getHistory from '../history'; 


const url="http://131.95.36.117:3001/login";



const styles =
theme => ({

container: {

display: 
'flex',

flexWrap: 
'wrap',

},

textField: {

marginLeft: 
theme.spacing.unit,

marginRight: 
theme.spacing.unit,

width: 200,

},

dense: {

marginTop: 
19,

},

menu: {

width: 200,

},

});





class Login extends React.Component {

constructor(props){
super(props);
this.state={
email:'',
password:'',
recordsnack:false,
passwordsnack:false

}

}



login(email,password){
let reqObject={email:email,password:password}
fetch(url, {
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(reqObject), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response =>response.json())
  .then((object)=>{
	console.log(object);
	if(object.success==-1)
	{
	this.setState({recordsnack:true})	
	}
	else if(object.success==0)
	{
 	this.setState({passwordsnack:true})	
	}
	else if(object.success==1)
	{
		//Go inside Dashboard
	getHistory().push({pathname:'/profile',state:{gId:object.gId}});
		 
	}
	})



}


render() {

return (


<div
id="LoginForm">

<h1>
<center>
Greek Life Apparel Login 
</center>
</h1>
<TextField

id="email"

label="Email"

hint="Registered Email"

margin="normal"
style={{width:300,alignSelf:'center'}}
onChange={(e)=>{this.setState({email:e.target.value})}}

/> 



<TextField

id="password"

label="Password"

margin="normal"

hint="Password"
style={{width:300,alignSelf:'center'}}
type="password"
onChange={(e)=>{this.setState({password:e.target.value})}}


/> 



<Button
variant="outlined"
color="primary"
style={{width:200,alignSelf:'center'}}
onClick={() => {this.login(this.state.email,this.state.password)}

}

>

Login


</Button>

<Snackbar
        className={this.props.classes.snackbar}
	open={this.state.recordsnack}
	onClose={()=>{
	this.setState({recordsnack:false})
	}}
	autoHideDuration={3000}
        message={
          'Greek Life Organization Record not Found on our Systems'
        }
      />
<Snackbar
        className={this.props.classes.snackbar}
	open={this.state.passwordsnack}
	onClose={()=>{
	this.setState({passwordsnack:false})
	}}
	autoHideDuration={3000}
        message={
          'Wrong email / password combination . Try again '
        }
      />


</div>

);

}

}

Login.propTypes={
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Login);
