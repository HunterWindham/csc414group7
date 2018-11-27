import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';

import getHistory from '../history';

const url="http://131.95.36.117:3001/register";

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
   descriptionField:{
	marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,

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
        base64logo:'',
        university: '',
        organization: '',
        location: '',
        phoneNumber: '',
        email: '',
        pass: '',
	desc:''
      };
      this.onDrop = this.onDrop.bind(this);
      this.readFile=this.readFile.bind(this);
  }
  register(){
    console.log(this.state.university,this.state.organization,this.state.location,this.state.phoneNumber,this.state.email,this.state.pass)

    let reqObject={
      university:this.state.university,
      org:this.state.organization,
      location:this.state.location,
      phone:this.state.phoneNumber,
      email:this.state.email,
      password:this.state.pass,
      logo:this.state.base64logo
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
    .then((object)=>{
	//waitforit	
	getHistory().push({pathname:'/waitforit'});
	console.log(object);
	})
  
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
      <div className= "formWrapper">
	<div style={{marginTop:10,fontSize:30}} className={classes.container}>
		<b>Register your Greek Life !! </b>
	</div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="University"
            className={classes.textField}
            type="required"
            margin="normal"
            onChange={(e)=>{this.setState({university:e.target.value})}}
          />
          <TextField
            label="Organization"
            className={classes.textField}
            type="required"
            margin="normal"
            onChange={(e)=>{this.setState({organization:e.target.value})}}
          />
          <TextField
            label="Pickup Location"
            className={classes.textField}
            margin="normal"
            onChange={(e)=>{this.setState({location:e.target.value})}}
          />
          <TextField
            label="Phone Number"
            className={classes.textField}
            type="required"
            margin="normal"
            onChange={(e)=>{this.setState({phoneNumber:e.target.value})}}
          />
          <TextField
            label="Email"
            className={classes.textField}
            type="required"
            type="email"
            margin="normal"
            onChange={(e)=>{this.setState({email:e.target.value})}}
          />
          <TextField
            label="Password"
            className={classes.textField}
            type="password"
            margin="normal"
            onChange={(e)=>{this.setState({pass:e.target.value})}}
          />
 	<TextField 
	label="Describe about your organization"
	className={classes.descriptionField}
	multiline
          rowsMax="4"
	onChange={(e)=>{this.setState({desc:e.target.value})}}/>
          <ImageUploader
                withIcon={true}
                buttonText='Choose Logo for your Greek Life '
                withPreview={true}
                withLabel={false}
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {this.register()}}
          >Register</Button>
        </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
