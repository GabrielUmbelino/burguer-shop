import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Layout from './hoc/Layout/Layout';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurguerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
