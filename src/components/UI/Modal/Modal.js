import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';
import React from 'react';

const modal = props => (
  <Aux>
    <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translatey(-100vh)', opacity: props.show ? 1 : 0 }}>
      {props.children}
    </div>
    <Backdrop show={props.show} clicked={props.modalClose} />
  </Aux>
);

export default modal;
