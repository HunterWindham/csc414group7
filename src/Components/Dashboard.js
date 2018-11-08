import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
//import Image from 'react-image-resizer';
//import image from 'path/to/image.jpg';
import './index.css'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
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
 
  
  
  /*const tileData = [
    {
      img: image,
      title: 'Image',
      author: 'aut  hor',
      cols: 2,
    },
    
  ];
 */
function ImageGridList(props) {
  const { classes } = props;
  console.log("Hello")
  return (
    <div style={{margin:10}}>
      
    <div className="imgbox">
    <img className="center-fit" src="http://www.theonlinebeacon.com/wp-content/uploads/2016/04/Greek-Letters-470x260.png"></img>
    </div>
    <div id="bio">
    <div>
      <center>
        <h1>The Awesome Greek Life </h1>
        <h3>Name of The University</h3>
      </center>
    </div>
    <div id="infoText" style={{marginTop:10}}>
      Location : 
    </div>
    <div id="infoText" style={{marginTop:10}}>
      Phone :   
    </div>
    </div>
    <div id="iconroot">
    <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
      </Button>
      </div>
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
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
export default withStyles(styles)(ImageGridList);
