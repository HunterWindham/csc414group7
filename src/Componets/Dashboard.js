import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from '../tileData';
//import Image from 'react-image-resizer';
//import image from 'path/to/image.jpg';
import '../index.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Info';
import ReactImageMagnify from 'react-image-magnify';
import Gallery from 'react-grid-gallery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ScaledImage from 'react-image-resizer';
import getHistory from '../history';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 800,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
	  
position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
},
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
  
});
 

const getDashboardurl="http://131.95.36.117:3001/getDashboard";

const getGreeklifeurl="http://131.95.36.117:3001/getOrgInfo"; 
  
  /*const tileData = [
    {
      img: image,
      title: 'Image',
      author: 'aut  hor',
      cols: 2,
    }e
    
  ];
 */
class Dashboard extends React.Component{

componentDidMount(){
let reqObject={gid:this.state.gId} //12131  is the hardcoded one
fetch(getDashboardurl,
{
    credentials: 'same-origin', // 'include', default: 'omit'
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(reqObject), // Coordinate the body type with 'Content-Type'
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response =>response.json())
  .then((object)=>{
	let td=[]
	console.log("Dashboard Results")
	console.log(object.data)
	for(var i=0;i<object.data.length;i++)
	{
	console.log("Added")
	td.push({appid:object.data[i]._id.toString(),img:object.data[i].logo,price:object.data[i].price,name:object.data[i].name})
	}
  	
	this.setState({tilesData:td})	
	
	
	});


//Get the Info
let req={gid:this.state.gId} 
console.log("Sending",this.state.gId)
fetch(getGreeklifeurl,
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
        console.log("Res",object)
	this.setState({
	org:object.data.org,
	pickup:object.data.pickup,
	phone:object.data.phone,
	university:object.data.email,
	logo:object.data.logo,
	desc:object.data.desc
	})

	});


}

constructor(props)
{
super(props)
console.log("GId is ",props.location.state.gId)

this.state={
tilesData:[],
gId:props.location.state.gId,
location:"",
org:"",
pickup:"",
phone:"",
university:"",
logo:"",
desc:""
}

}

render(){
console.log(this.state.tilesData)
return(
<div>
 <div className="imgbox">
    <ScaledImage className="center-fit" src={this.state.logo}
     width={500}
      height={300}
	/>

    <div id="infoCard" style={{marginLeft:50,marginRight:50}}>
   <Card raised={true} style={{marginTop:10,paddingTop:0,paddingBottom:0,width:500}} className={this.props.classes.card}>
    <CardContent>
    <div style={{marginTop:10}}>
      <center>
        <h1>{this.state.org}</h1>
        <h3 style={{marginTop:10}}>{this.state.university}</h3>
      </center>
    </div>
    <div id="infoText" style={{marginTop:10}}>
      Location : {this.state.pickup}
    </div>
    <div id="infoText" style={{marginBottom:10}}>
      Phone : {this.state.phone}
    </div>

	<b>Description: </b>	
	<div id="infoText" style={{marginTop:10,marginBottom:10}}>
      {this.state.desc}
    </div>

    <Button  style={{position:"relative"}} variant="fab" color="secondary" aria-label="Edit" className={this.props.classes.button} onClick={()=>{
getHistory().push({pathname:'/editprofile',state:{gId:this.state.gId}});
}}>
      <EditIcon/>
	</Button>

   </CardContent>
  </Card>
	</div>
    <div id="iconroot" style={{marginTop:10}}>
    <Button variant="fab" color="primary" aria-label="Add" className={this.props.classes.button} onClick={()=>{
getHistory().push({pathname:'/addApparel',state:{gId:this.state.gId}});
}}>
        <AddIcon />
      </Button>
      </div>
	</div>
	<div style={{marginTop:10}}>
	</div>
<ImageGridList  style={{marginTop:10}} classInfo={this.props.classes} gridItems={this.state.tilesData}/>
</div>

);
}
}

function ImageGridList(props) {
  console.log("Inside Grid List")
  console.log(props.classInfo)
  const { classes } = props.classInfo;
	return (
    <div style={{margin:10}}>
    <div className={props.classInfo.root}>
      <GridList cellHeight={300}  cellWidth={400} className={props.classInfo.gridList} cols={3}>
        {props.gridItems.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
 
	   <img src={tile.img} alt={tile.title}
	    />
	   <GridListTileBar
              title={tile.name}
              subtitle={<span> $: {tile.price}</span>}
              actionIcon={
                <IconButton className={props.classInfo.icon} 
		  onClick={() => {
		console.log("Edit Info",tile.appid)
		getHistory().push({pathname:'/editApparel',state:{appid:tile.appid}});
		}}>
                  <EditIcon />
                </IconButton>
              }
            />

          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};
class DashboardView extends Component{
reder(){
return(
<div>
  <ImageGridList/>
  </div>)
}
}
export default withStyles(styles)(Dashboard);
