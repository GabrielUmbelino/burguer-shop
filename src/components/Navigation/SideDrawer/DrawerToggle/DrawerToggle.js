import classes from './DrawerToggle.css';
import menuIcon from '../../../../assets/images/menu.svg';
import React from 'react';
const menu = props => (
  <div className={classes.DrawerToggle}>
    <img src={menuIcon} alt="menu" onClick={props.clicked} />
  </div>
);

export default menu;
