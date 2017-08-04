import React, { Component } from 'react';
import {Button, Card, Input, CardTitle, Col, Row, Form} from 'reactstrap';

import { createOrJoin } from '/imports/api/rooms/methods';
import { COMMON_ROOM_TITLE } from '/imports/api/rooms/rooms';
import {throwError} from "../lib/handleErrors";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { username: '' };
  }

  onLogin(e) {
    e.preventDefault();
    const { username } = this.state;
    username && createOrJoin.call(
      {
        username,
        title: COMMON_ROOM_TITLE,
      },
      (e , roomId) => throwError(e, () => roomId && this.props.router.push(`/room/${roomId}`))
    );
  }

  onChange({ target }) {
    this.setState({ username: target.value });
  }

  render() {
    return (
      <Row className="login-form">
        <Col sm={{ size: 6,  offset: 3 }}>
          <Card block>
            <Row>
              <Col>
                <CardTitle className="justify-content-center">HEEBO.CHAT</CardTitle>
              </Col>
            </Row>
            <Form onSubmit={this.onLogin}>
              <Input
                onChange={this.onChange}
                value={this.state.username}
              />

              <Button
                disabled={!this.state.username.length}
                className="form-control"
              >Chat now!</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}