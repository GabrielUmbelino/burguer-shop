import BurguerIngredient from './BurguerIngredient/BurguerIngredient';
import classes from './Burger.css';
import React from 'react';

const burguer = props => {
  // let zIndex = Object.keys(props.ingredients).reduce((sum, key) => sum + props.ingredients[key], 1);
  // console.log(zIndex);
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurguerIngredient key={igKey + i} type={igKey} zIndex={i} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, [])
    .reverse();

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients.</p>;
  }
  return (
    <div className={classes.Burguer}>
      <BurguerIngredient type="bread-top" />
      {transformedIngredients}
      <BurguerIngredient type="bread-bottom" />
    </div>
  );
};

export default burguer;
