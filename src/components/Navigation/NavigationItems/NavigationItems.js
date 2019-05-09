import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Burguer Builder
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navigationItems;
