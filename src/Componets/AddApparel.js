import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';
const url="http://131.95.36.117:3001/addApparel";
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});
class TextFields extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        name:'',
        description: '',
        price: '',
        base64logo:'',
        scount:0,
        mcount:0,
        lcount:0,
        xlcount:0,
        greeklifeId:12131 //Get it from the server  when we log in the system 
      };
      this.onDrop = this.onDrop.bind(this);
      this.readFile=this.readFile.bind(this);
  }
  add(){
    console.log(this.state.university,this.state.organization,this.state.location,this.state.phoneNumber,this.state.email,this.state.pass)
    let reqObject={
      name:this.state.name,
      description:this.state.description,
      price:this.state.price,
      scount:this.state.scount,
      mcount:this.state.mcount,
      lcount:this.state.lcount,
      xlcount:this.state.xlcount,
      logo:this.state.base64logo,
      greeklifeId:this.state.greeklifeId
    }
    fetch(url, {
      credentials: 'same-origin', // 'include', default: 'omit'
      method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
      body: JSON.stringify(reqObject), // Coordinate the body type with 'Content-Type'
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    })
    .then(response =>response.json())
    .then((object)=>console.log(object));
  }
  
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        let dataURL = e.target.result;
       // console.log(e.target.result)
        //dataURL = dataURL.replace(";base64", `;name=${file.name};base64`);
      // console.log(file)
      // console.log(dataURL)
        resolve({dataURL});
      };
      reader.readAsDataURL(file);
    });
  }
  onDrop(picture) {
      this.readFile(picture[0]).then(result=>{
        this.setState({base64logo:result["dataURL"]})
      }) 
  }
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  render() {
    const { classes } = this.props;
    return (
        <div>
            <center><h1>Add New Apparel </h1></center>
      <div className= "formWrapper">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Name"
            className={classes.textField}
            type="required"
            margin="normal"
            onChange={(e)=>{this.setState({name:e.target.value})}}
          />
          <TextField
            label="Description"
            className={classes.textField}
            type="required"
            margin="normal"
            onChange={(e)=>{this.setState({description:e.target.value})}}
          />
          <TextField
            label="Price (in $) "
            className={classes.textField}
            margin="normal"
            type="number"
            onChange={(e)=>{this.setState({price:e.target.value})}}
          />
         
            <div id="stockCounts">
            <TextField
            label="S"
            className={classes.textField}
            margin="normal"
            type="number"
            style={{width:50}}
            onChange={(e)=>{this.setState({scount:e.target.value})}}
          />
          <TextField
            label="M"
            className={classes.textField}
            margin="normal"
            type="number"
            style={{width:50}}
            onChange={(e)=>{this.setState({mcount:e.target.value})}}
          />
          <TextField
            label="L"
            className={classes.textField}
            margin="normal"
            type="number"
            style={{width:50}}
            onChange={(e)=>{this.setState({lcount:e.target.value})}}
          />
          <TextField
            label="XL"
            className={classes.textField}
            margin="normal"
            type="number"
            style={{width:50}}
            onChange={(e)=>{this.setState({xlcount:e.target.value})}}
          />
            </div>
          <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                withPreview={true}
                withLabel={false}
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {this.add()}}
          >Add !</Button>
        </form>
      </div>
      </div>
    );
  }
}
TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);
