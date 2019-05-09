import burguerLogo from '../../assets/images/logo.png';
import classes from './Logo.css';
import React from 'react';

const logo = props => (
  <div className={classes.Logo}>
    <img src={burguerLogo} alt="Burguer Shop" />
  </div>
);

export default logo;
