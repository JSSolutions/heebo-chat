import React from 'react';
import {Button, Col, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import MemberItem from "./MemberItem";

export default RoomHeader = ({
       members, isOpen, onJoinClick, onSubmitChange, onChangeTitle, roomTitle, username
}) => (
  <Col sm="3">
    <Button
      className="form-control"
      onClick={onJoinClick}
    >Join Room</Button>

    {members.map(member => <MemberItem key={member} member={member} username={username}  />)}

    <Modal isOpen={isOpen} toggle={onJoinClick}>
      <ModalHeader toggle={onJoinClick}>Modal title</ModalHeader>
      <Form onSubmit={onSubmitChange}>
        <ModalBody>
          <Input
            placeholder="Room name"
            onChange={onChangeTitle}
            className="form-control"
            value={roomTitle}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Join in</Button>{' '}
          <Button color="secondary" type="reset" onClick={onJoinClick}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </Col>
);