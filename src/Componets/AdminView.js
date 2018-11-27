import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {
Link
} from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

const getAllOrgs="http://131.95.36.117:3001/getAllOrgs"
const validateProfile="http://131.95.36.117:3001/validateProfile"


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


class AdminView extends React.Component{

constructor(props){
super(props)
this.state={
tilesData:[]
}

this.validateGreeklife=this.validateGreeklife.bind(this)
this.getvalidationList=this.getvalidationList.bind(this)

}

getvalidationList(){
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
        if(object.data[i].validated==0){
        console.log("Added")
        td.push({id:object.data[i]._id,logo:object.data[i].logo,university:object.data[i].university,org:object.data[i].org,
        phone:object.data[i].phone,pickup:object.data[i].pickup,email:object.data[i].email,desc:object.data[i].desc})

        }
        }

        this.setState({tilesData:td})


        });



}




validateGreeklife(gId){
let req={gId:gId}

fetch(validateProfile,
{
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(req), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response =>response.json())
  .then((object)=>{
	//Updated : Now , reload the list 
 	this.getvalidationList()	
        });



}


componentDidMount(){
	this.getvalidationList()
}


render()
{
return(
	<div>
	<div id="Login" style={{marginLeft:20,display:'flex',justifyContent:'flex-start'}}>
        <Link to="/">
        <Button variant="contained" color="primary" className={this.props.classes.button}>
        Home
      </Button>
        </Link>
	</div>
	<div id="adminRoot">
      <div className={this.props.classes.root}>
	<center><h2> Requests for Joining Marketplace </h2></center>
	 <List>
          {this.state.tilesData.map(value => (
            <ListItem key={value} role={undefined} dense button>
		<div id="listrow">
		<div id="listcol">
		
		<div id="list-uni">{value.university}</div>
		<div id="list-org" style={{marginTop:10}}>{value.org}</div>
			<div id="list-logo">
				<img src={value.logo} width="200" height="200"></img>
			</div>
		<div id="list-desc" style={{marginTop:10}}> Description: {value.desc}</div>
		<div id="list-contact" style={{marginTop:10}}>Contact Email : {value.email} </div>
		<div id="list-phone" style={{marginTop:10}}> Contact Phone : {value.phone} </div>
		</div>
		<Button variant="fab" mini color="primary" aria-label="Add" className={this.props.classes.button} 		onClick={()=>{this.validateGreeklife(value.id)}}>
        <AddIcon />
      </Button>
		</div>
            </ListItem>
          ))}
        </List>
	
	</div>
	</div>
	</div>
);
}


}


AdminView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminView);

