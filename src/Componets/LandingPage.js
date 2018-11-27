import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchBar from 'material-ui-search-bar'

import windowSize from 'react-window-size';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';


import Gallery from 'react-grid-gallery';
import {
Link
} from 'react-router-dom';

import Snackbar from '@material-ui/core/Snackbar';


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import getHistory from '../history';

const getAllOrgs="http://131.95.36.117:3001/getAllOrgs"

const adminLogin="http://131.95.36.117:3001/adminlogin"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});




class App extends Component {

constructor(props)
{
super(props)
this.state={
currentSearch:"",
tilesData:[],
adminDialogOpen:false
}


}

componentDidMount(){
console.log("Component Mount Called")

fetch(getAllOrgs,
{
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response =>response.json())
  .then((object)=>{
        let td=[]
        for(var i=0;i<object.data.length;i++)
        {
        if (object.data[i].validated==1){
	
	td.push({src:object.data[i].logo,thumbnail:object.data[i].logo,thumbnailWidth:400,thumbnailHeight:300,caption:object.data[i].org,customOverlay:(<HoverButton gid={object.data[i]._id.toString()} />)}) 
	}
	
	}

	console.log("TilesData ",td)
	this.setState({tilesData:td})


        });


}


  render() {
console.log(this.state.tilesData)  
  return (
	  <MuiThemeProvider>
	<div>
	<div id="Title">
	 
	Greek Life Apparel MarketPlace 
 	
	</div>
	<AdminLoginDialog classes={this.props.classes} adminDialogOpen={this.state.adminDialogOpen}/> 
	<div id="Login" style={{marginRight:20}}>
        <Button variant="contained" color="yellow" onClick={()=>{this.setState({adminDialogOpen:true})}} className={this.props.classes.button}>
        Administrator
      </Button>
	<Link to="/login">
 	<Button variant="contained" color="primary" className={this.props.classes.button}>
        Login
      </Button>	
	</Link>
	<Link to="/register">
        <Button variant="contained" color="secondary" className={this.props.classes.button}>
        Register
	</Button>
	</Link>
	</div>	
	<div  id="container">
	<div style={{marginTop:100}}>

	<SearchBar
      onChange={(e) =>this.setState({currentSearch:e})}
      onRequestSearch={(e) => console.log('onRequestSearch',this.state.currentSearch)}
      style={{
        margin: '0 auto',
        maxWidth: 500//this.props.windowWidth*0.6
      }}
	hintText={"Search Greek Life Apparels "}
    />
	
        <div style={{marginTop:50}}>	
	<Gallery className="center-fit"  enableImageSelection={false} images={this.state.tilesData} 
	margin={20} 
	/>
	</div>
	</div>
	</div>
	</div>
	  </MuiThemeProvider>
    );
  }
}

class HoverButton extends React.Component{

render()
{
return(
<div style={{pointerEvents: "auto"}}>
 <Button variant="contained"  onClick={()=>{
       	console.log("Navigating To ",this.props.gid) 
	getHistory().push({pathname:'/userprofile',state:{gId:this.props.gid}})
	}}
        >
        Visit
        </Button>
        </div>
);
}



}


class AdminLoginDialog extends React.Component{
constructor(props)
{
super(props);
this.state={
open:props.adminDialogOpen,
email:'',
password:'',
loginsnack:false
}
this.handleClose=this.handleClose.bind(this);
this.handleLogin=this.handleLogin.bind(this);
}

componentWillReceiveProps(nextProps){
console.log("NextProps is ",nextProps);
this.setState({open:nextProps.adminDialogOpen})

}

handleClose(){
this.setState({open:false})
}

handleLogin(){
console.log("Authenticate for Login")
//adminlogin
let req={email:this.state.email,password:this.state.password}

fetch(adminLogin,
{
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(req),
	headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response =>response.json())
  .then((object)=>{
	console.log(object)
	if(object.success==1){
	 getHistory().push({pathname:'/admin'})	
	}
	else{
		this.setState({loginsnack:true})
	}
        
	});

}


render()
{
console.log("Dialog Status",this.state.open)
return(
<div>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
<DialogTitle id="form-dialog-title">Admin Login </DialogTitle>
          <DialogContent>
            <DialogContentText>
            	If you are an administrator of the marketplace , enter your credentials for accessing highest privilege
		</DialogContentText>
		<div style={{display:'flex',flexDirection:'column'}}>
            <TextField
	      style={{marginTop:5}}
              id="name"
              label="Email Address"
              type="email"
            onChange={(e)=>{this.setState({email:e.target.value})}}
		/>
	    <TextField
	      style={{marginTop:5}}
              id="password"
              label="Password"
              type="password"
	   onChange={(e)=>{this.setState({password:e.target.value})}}
            />
		</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary">
              Login
            </Button>
          </DialogActions>
	
		<Snackbar
        className={this.props.classes.snackbar}
        open={this.state.loginsnack}
        onClose={()=>{
        this.setState({loginsnack:false})
        }}
        autoHideDuration={3000}
        message={
          'Admin Information Incorrect'
        }
      />
</Dialog>
</div>

);
}

}





export default withStyles(styles)(App);
