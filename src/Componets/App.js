import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchBar from 'material-ui-search-bar'

import windowSize from 'react-window-size';

import Gallery from 'react-grid-gallery';

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


class App extends Component {

constructor(props)
{
super(props)
this.state={
currentSearch:""
}


}



  render() {
    return (
	  <MuiThemeProvider>
	<div>
	<div id="Title">
	 
	Greek Life Apparel MarketPlace 
 	
	</div>
	
	<div id="Login" style={{marginRight:20}}>
	Login !! 
	</div>	
	<div  id="container">
	<div style={{marginTop:100}}>

	<SearchBar
      onChange={(e) =>this.setState({currentSearch:e})}
      onRequestSearch={(e) => console.log('onRequestSearch',this.state.currentSearch)}
      style={{
        margin: '0 auto',
        maxWidth: this.props.windowWidth*0.6
      }}
	hintText={"Search Greek Life Apparels "}
    />
	
        <div style={{marginTop:50}}>	
	<Gallery images={IMAGES} margin={6}/>
	</div>
	</div>
	</div>
	<div id="Register">
        Register your own Greek Life here !!
        </div>
	</div>
	  </MuiThemeProvider>
    );
  }
}

export default windowSize(App);
