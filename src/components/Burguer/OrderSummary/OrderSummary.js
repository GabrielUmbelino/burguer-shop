import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import React, { Component } from 'react';
class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary] updaito');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'captalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burguer with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
