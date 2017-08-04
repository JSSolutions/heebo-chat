import React, { Component } from 'react';
import Alert from 'react-s-alert'

import { Container } from 'reactstrap';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '' };
    this.handleUsername = this.handleUsername.bind(this);
  }

  handleUsername(username) {
    this.setState({username});
  }

  render() {
    return (
      <div>
        <Container>
          {this.props.children && React.cloneElement(this.props.children, {
            handleUsername: this.handleUsername,
            username: this.state.username,
          })}
        </Container>

        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}