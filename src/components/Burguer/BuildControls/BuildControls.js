import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import React from 'react';

const controls = [
  { label: 'Tomato', type: 'tomato' },
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Gerkins', type: 'gerkins' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Burguer', type: 'burguer' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={props.ingredientAdded.bind(this, ctrl.type)}
        removed={props.ingredientRemoved.bind(this, ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button disabled={!props.purchasable} onClick={props.ordered}>
      {
        props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'
      }
    </button>
  </div>
);

export default buildControls;
