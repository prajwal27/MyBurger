import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  /* constructor(props) {
        super(props);
        this.state = 
    } */
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 2,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseHandler(ingredients) {
    /* const ingredients = {
        ...this.state.ingredients
    }; */

    const sum = Object.keys(ingredients).map((igKey) => {
        return ingredients[igKey]
    })
    .reduce((sum, el) =>  {
        return sum + el;
    },0);

    this.setState({
        purchasable: sum>0
    });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing : true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing : false
    });
  }

  purchaseContinueHandler = () => {
    alert('You continue! ');
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceToBeAdded = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceToBeAdded;
    this.setState({
      price: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseHandler(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    //if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceToBeDeleted = INGREDIENT_PRICES[type];
      const oldPrice = this.state.price;
      const newPrice = oldPrice - priceToBeDeleted;
      this.setState({
        price: newPrice,
        ingredients: updatedIngredients
      });
    //}
    this.updatePurchaseHandler(updatedIngredients);
  };

  render() {

    const disbaleInfo = {
        ...this.state.ingredients
    };

    for (let key in disbaleInfo) {
        disbaleInfo[key] = disbaleInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} purchaseCancelled={this.purchaseCancelHandler} 
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.price}/>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled = {disbaleInfo}
          price = {this.state.price}
          purchasable = {this.state.purchasable}
          ordered = {this.purchaseHandler}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
