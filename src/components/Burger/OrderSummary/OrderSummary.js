import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}      
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3> Your Order </h3>
      <p> Delicious burger with following items </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p> Continue to Checkout?</p>
    </Auxiliary>
  );
};

export default orderSummary;
