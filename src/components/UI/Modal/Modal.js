import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';
import React, { Component } from 'react';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.childre !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <div className={classes.Modal} style={{ transform: this.props.show ? 'translateY(0)' : 'translatey(-100vh)', opacity: this.props.show ? 1 : 0 }}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
      </Aux>
    );
  }
}

export default Modal;
