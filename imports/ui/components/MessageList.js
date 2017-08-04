import React from 'react';
import MessageItem from "./MessageItem";
import { Col } from "reactstrap";

export default MessageList = ({ messages }) => (
  <Col sm="9">
    {messages.length ?
      messages.map(message => <MessageItem key={message._id} message={message} />) :
      <MessageItem message={{
        username: '',
        body: 'No messages yet',
        createdAt: ''
      }} />
    }
  </Col>
);