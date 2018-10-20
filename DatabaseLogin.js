import React
from 'react';

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


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';



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
open:false,
snackopen:false

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
    if (object["success"]==0){
        this.setState({open:true})
    }
    else if(object["success"]==1){
        this.setState({snackopen:true})
    }
  })
}


render() {

return (

<div
id="LoginForm">

<TextField

id="email"

label="Email"

hint="Registered Email"

margin="normal"

onChange={(e)=>{this.setState({email:e.target.value})}}

/> 



<TextField

id="password"

label="Password"

margin="normal"

hint="Password"

type="password"
onChange={(e)=>{this.setState({password:e.target.value})}}


/> 



<Button
variant="outlined"
color="primary"
onClick={() => {this.login(this.state.email,this.state.password)}

}

>

Login


</Button>


<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Authentication Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             Maybe you forgot your password !! 
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Reset Password
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Try Again !! 
            </Button>
          </DialogActions>

</Dialog>


<Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackopen}
          autoHideDuration={1}
          message={<span id="message-id">You'll be  logged in to your Dashboard!!</span>}

          ></Snackbar>


</div>

);

}

}

export default Login;
