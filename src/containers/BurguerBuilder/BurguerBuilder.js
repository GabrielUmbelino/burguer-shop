import Aux from '../../hoc/Aux/Aux';
import React, { Component } from 'react';
import Burguer from '../../components/Burguer/Burguer';
import BuildControls from '../../components/Burguer/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
  tomato: 0.4,
  lettuce: 0.2,
  gerkins: 0.4,
  bacon: 0.7,
  cheese: 0.4,
  burguer: 1.3,
};

class BurguerBuilder extends Component {
  state = {
    ingredients: {
      burguer: 0,
      bacon: 0,
      cheese: 0,
      gerkins: 0,
      lettuce: 0,
      tomato: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('you continue!');
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />
        </Modal>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler.bind(this)} ingredientRemoved={this.removeIngredientHandler.bind(this)} disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler} />
      </Aux>
    );
  }
}

export default BurguerBuilder;
