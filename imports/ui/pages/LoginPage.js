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
  }

  onLogin(e) {
    e.preventDefault();
    const { username } = this.props;
    username && createOrJoin.call(
      {
        username,
        title: COMMON_ROOM_TITLE,
      },
      (err , roomId) => throwError(err, () => {
        if (roomId) {
          this.props.router.push(`/room/${roomId}`);
        }
      })
    );
  }

  onChange({ target }) {
    this.props.handleUsername(target.value);
  }

  render() {
    return (
      <Row>
        <Col sm={{ size: 6,  offset: 3 }}>
          <Card block>
            <Row>
              <Col>
                <CardTitle>HEEBO.CHAT</CardTitle>
              </Col>
            </Row>
            <Form onSubmit={this.onLogin}>
              <Input
                placeholder="Username"
                onChange={this.onChange}
                value={this.props.username}
              />

              <Button
                disabled={!this.props.username.length}
                className="form-control"
              >Chat now!</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}
