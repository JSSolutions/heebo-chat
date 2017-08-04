import React from 'react';
import { Media } from "reactstrap";

export default MessageItem = ({ member, username }) => (
  <Media>
    <Media body>
      <Media className={member === username ? 'currentUser' : ''} heading>
        {member}
      </Media>
    </Media>
  </Media>
);