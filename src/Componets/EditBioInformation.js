import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';

const getGreeklifeurl="http://131.95.36.117:3001/getOrgInfo";
const updateGreeklifeurl="http://131.95.36.117:3001/updateOrgInfo";

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
    width: 300,
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
	desc:'',
	imgUpdated:false,	
	gId:props.location.state.gId
      };
      this.onDrop = this.onDrop.bind(this);
      this.readFile=this.readFile.bind(this);
  }

componentDidMount(){
let reqObject={gid:this.state.gId}
fetch(getGreeklifeurl,
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
        console.log("Res",object)
        this.setState({
        organization:object.data.org,
        location:object.data.pickup,
        phoneNumber:object.data.phone,
        logo:object.data.logo,
        desc:object.data.desc,
	email:object.data.email,
	university:object.data.university,
	base64logo:object.data.logo
        })

        });

}

  update(){
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


    fetch(updateGreeklifeurl, {
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
        this.setState({imgUpdated:true,base64logo:result["dataURL"]})
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
		<b>Edit your Greek Life Bio !! </b>
	</div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="University"
            className={classes.textField}
            type="required"
            margin="normal"
            readOnly={true}
	    value={this.state.university}
	    />
          <TextField
            label="Organization"
            className={classes.textField}
            type="required"
            margin="normal"
            readOnly={true}
	    value={this.state.organization}
	   />
          <TextField
            label="Pickup Location"
            className={classes.textField}
            margin="normal"
	    value={this.state.location}
            onChange={(e)=>{this.setState({location:e.target.value})}}
          />
          <TextField
            label="Phone Number"
            className={classes.textField}
            type="required"
            margin="normal"
	    value={this.state.phoneNumber}
            onChange={(e)=>{this.setState({phoneNumber:e.target.value})}}
          />
          <TextField
            label="Email"
            className={classes.textField}
            type="required"
            type="email"
            margin="normal"
           readOnly={true}
	   value={this.state.email}
	   />
 	<TextField 
	label="Describe about your organization"
	className={classes.descriptionField}
	multiline
          rowsMax="4"
	  value={this.state.desc}
	onChange={(e)=>{this.setState({desc:e.target.value})}}/>
	
	{this.state.imgUpdated==0 &&
           <div id="previewImage">
                <img src={this.state.base64logo} width={250} height={250} ></img>
           </div>
                }

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
            onClick={() => {this.update()}}
          >Update</Button>
        </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
