import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class BurguerIngredient extends Component {
  ingredients = {
    'bread-top': (
      <div className={classes.BreadTop} style={{ zIndex: '8' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/bread-top.svg" />
      </div>
    ),
    tomato: (
      <div className={classes.Tomato} style={{ zIndex: '7' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/tomato.svg" />
      </div>
    ),
    lettuce: (
      <div className={classes.Lettuce} style={{ zIndex: '6' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/lettuce.svg" />
      </div>
    ),
    gerkins: (
      <div className={classes.Gerkins} style={{ zIndex: '5' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/gerkins.svg" />
      </div>
    ),
    cheese: (
      <div className={classes.Cheese} style={{ zIndex: '4' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/cheese.svg" />
      </div>
    ),
    bacon: (
      <div className={classes.Bacon} style={{ zIndex: '3' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/bacon.svg" />
      </div>
    ),
    burguer: (
      <div className={classes.Burguer} style={{ zIndex: '2' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/burguer.svg" />
      </div>
    ),
    'bread-bottom': (
      <div className={classes.BreadBottom} style={{ zIndex: '1' + this.props.zIndex }}>
        <ReactSVG src="/ingredients/bread-bottom.svg" />
      </div>
    ),
  };
  render() {
    return this.ingredients[this.props.type];
  }
}

BurguerIngredient.propType = {
  type: PropTypes.string.isRequired,
};

export default BurguerIngredient;
