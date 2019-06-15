import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHadler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 8
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: 'email',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: 'text',
          placeholder: 'Your email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      delivery: {
        elementType: "select", 
        elementConfig: {
          options: [
            { value: 'fastest', text: 'Fastest' },
            { value: 'cheapest', text: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({loading: true});

    const formData = {};

    for (let id in this.state.orderForm) {
      formData[id] = this.state.orderForm[id].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurguer(order);
  }

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] } ;    

    updatedFormElement.value = event.target.value
    updatedFormElement.valid =  this.checkValidity( updatedFormElement.value, updatedFormElement.validation );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength & isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength & isValid;
    }

    return isValid
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form>
        {
          formElementsArray.map(el => (
              <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                changed={event => this.inputChangeHandler(event, el.id)}
                touched={el.config.touched}
                />
            )
          )
        }
        <Button
          btnType="Success"
          clicked={this.orderHandler.bind(this)}
          disabled={!this.state.formIsValid}>
            ORDER
          </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burguerBuilder.ingredients,
    price: state.burguerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => (  
  {
   onOrderBurguer: orderData => dispatch(actions.purchaseBurguer(orderData))
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));