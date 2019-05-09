import classes from './Backdrop.css';
import React from 'react';
const backdrop = props => (props.show ? <div className={classes.Backdrop} onClick={props.clicked} /> : null);

export default backdrop;
