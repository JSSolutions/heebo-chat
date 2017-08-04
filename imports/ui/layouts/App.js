import React, { Component } from 'react';
import Alert from 'react-s-alert'

import { Container } from 'reactstrap';

export default class App extends Component {
  render() {
    return (
      <div>
        <Container>
          {this.props.children}
        </Container>

        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}