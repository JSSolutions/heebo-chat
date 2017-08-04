import React from 'react';
import {Col, Row} from "reactstrap";

export default MessageItem = ({ message, username }) => (
  <Row className={message.username === username ? 'currentUser' : ''}>
    <Col sm="3">
      <h4>
        {message.username}
      </h4>
    </Col>
    <Col sm="9">
      <i>{message.createdAt.toLocaleString()}</i>
      <h5>
        {message.body}
      </h5>
    </Col>
  </Row>
);