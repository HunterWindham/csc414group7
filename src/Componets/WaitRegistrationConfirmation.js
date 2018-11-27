import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
Link
} from 'react-router-dom';

class WaitForItComponent extends React.Component{
constructor(props)
{
super(props)

}

render(){
return(
<div id="waitroot" style={{marginTop:40}}>
<div>
Wait While We get back to you after confirming your details !! 
</div>

<div style={{marginTop:30}}>
<img src="https://png.pngtree.com/svg/20170406/login_registration_large_verification_code_300927.png" width="250" height="250">
</img>
</div>

<Link to="/dashboard">
<Button
            variant="outlined"
            color="primary"
          >Return to Home Page </Button>

</Link>
</div>

);
}

}

export default WaitForItComponent;

