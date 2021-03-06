import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/"> Burguer Builder </NavigationItem>
    { props.isAuthenticated ? <NavigationItem link = "/orders" > Orders </NavigationItem> : null}
    {
      !props.isAuthenticated 
        ? <NavigationItem link="/auth"> Authenticate </NavigationItem>
        : <NavigationItem link="/logout"> Logout </NavigationItem>
    }
  </ul>
);

export default navigationItems;
