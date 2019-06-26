import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckState()
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurguerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurguerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
