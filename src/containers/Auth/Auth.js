import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import Input from  '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility'
class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  componentDidMount() {
    if (!this.props.buildingBurguer && this.props.authRedirectPath !== '/') {
      this.onSetAuthRedirectPath()
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    })

    this.setState({controls: updatedControls})
  }

  submitHandler = event =>  {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  render() {



    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = (
      <form onSubmit={this.submitHandler}>
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
        <Button btnType="Success"> SUBMIT </Button>
      </form>

    );

    if (this.props.loading) {
      form = <Spinner/>
    }
    
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>
    }


    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        { authRedirect }
        { errorMessage }
        { form }
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">
          SWITCH TO { this.state.isSignup ? 'SIGNIN' : 'SIGNUP' }
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({auth, burguerBuilder}) => {
  return {
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.token !== null,
    buildingBurguer: burguerBuilder.building,
    authRedirectPath: auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);