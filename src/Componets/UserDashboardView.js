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

import logo from '../logo.svg';
import '../App.css';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
},
  
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

const IMAGES =
[
{
        src: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnail: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg",
	thumbnail:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg", 
	thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},
 
{
       src:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png",
	thumbnail:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png", 
	thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
       src:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png",
	thumbnail:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png", 
	thumbnailWidth: 320,
        thumbnailHeight: 212
}
,
{
        src: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnail: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg",
        thumbnail:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
       src:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png",
        thumbnail:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
       src:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png",
        thumbnail:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
        src: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnail: "https://www.logolynx.com/images/logolynx/62/62a4d89ba5cca13cfbc261ef195a6226.jpeg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg",
        thumbnail:"https://www.cpp.edu/~oslcc/greeklife/img/Greek%20Life.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
       src:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png",
        thumbnail:"https://www.logolynx.com/images/logolynx/21/213f9d079bf6e4f448b789a2c3cc8be9.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212
},
{
       src:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png",
        thumbnail:"https://msutexas.edu/student-life/involvement/_assets/images/greek-life/logo-greek-life-web.png",
        thumbnailWidth: 320,
        thumbnailHeight: 212
}

]

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
	td.push({src:object.data[i].logo,thumbnail:object.data[i].logo,caption:object.data[i].name +"  Price : $ "+object.data[i].price,thumbnailWidth:400,thumbnailHeight:300 })
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
console.log("Tiles Data is ",this.state.tilesData)
return(
<div id="mainroot">

 <div className="imgbox">
    <ScaledImage className="center-fit" src={this.state.logo}
     width={500}
      height={300}
	/>

    <div id="infoCard" style={{marginLeft:50,marginRight:50}}>
   <Card raised={true} style={{marginTop:10,paddingTop:0,paddingBottom:0,width:500}} className={this.props.classes.card}>
    <CardContent>
    <div>
      <center>
        <h1>{this.state.org}</h1>
        <h3>{this.state.university}</h3>
      </center>
    </div>
    <div id="infoText" style={{marginTop:10}}>
      Location : {this.state.pickup}
    </div>
    <div id="infoText" style={{marginBottom:10}}>
      Phone : {this.state.phone}
    </div>
	<b> Description : </b>
	<div id="infoText" style={{marginTop:10}}>
	{this.state.desc}	
</div>

   </CardContent>
  </Card>
	</div>
	</div>
<div  id="gallery" style={{marginTop:50}}>
        <Gallery className="center-fit" enableImageSelection={false} images={IMAGES}
        margin={20}
        />
        </div>
	

	</div>

);
}
}

export default withStyles(styles)(Dashboard);
