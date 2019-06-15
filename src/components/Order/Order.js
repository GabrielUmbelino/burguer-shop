import React from 'react';
import classes from './Order.css'
const order = props => {
  const ingredients = [];

  for (let name in props.ingredients) {
    if(props.ingredients[name]) {
      ingredients.push({
        name,
        amount: props.ingredients[name]
      })
    }
  }

  const $ingredients = ingredients
    .map(i => (
        <span
          key={i.name}
          style={{
            textTransform: 'captalize',
            display: 'inline-block',
            margin: '0 8px',
            border: 'solid 1px #ccc',
            borderRadius: '3px',
            padding: '5px'
          }}
          >
          {i.name}
          <strong>
            ({i.amount})
          </strong>
        </span>
    ) 
  )

  return (
    <div className={classes.Order}>
      <p>
        Ingredients: {$ingredients}
      </p>
      <p>Price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default order