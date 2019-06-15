import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/"> Burguer Builder </NavigationItem>
    <NavigationItem link="/orders"> Orders </NavigationItem>
    <NavigationItem link="/auth"> Authenticate </NavigationItem>
  </ul>
);

export default navigationItems;
