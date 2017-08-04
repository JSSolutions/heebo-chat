import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import {Button, Col, Form, Input, Row} from 'reactstrap';
import RoomHeader from '/imports/ui/components/RoomHeader';
import MessageList from '/imports/ui/components/MessageList';
import MemberList from '/imports/ui/components/MemberList';

import { Rooms } from '/imports/api/rooms/rooms';
import { addMessage, leaveOrRemove, createOrJoin } from '/imports/api/rooms/methods';
import {throwError} from '../lib/handleErrors';

class RoomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
      newRoom: '',
      joinIsOpen: false,
    };

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
  }

  componentWillMount() {
    if (!this.props.username.length) {
      this.props.router.push('/');
    }
  }

  componentDidMount() {
    const _this = this;
    window.addEventListener("beforeunload", function () {
      _this.componentWillUnmount();
    })
  }

  componentWillUnmount() {
    const { username } = this.props;
    username && leaveOrRemove.call({
      username,
      _id: this.props.room._id
    })
  }

  handleAddMessage(e) {
    e.preventDefault();
    const { username, room } = this.props;
    const { newMessage } = this.state;
    if (username && newMessage) {
      addMessage.call(
        { username, body: newMessage, _id: room._id },
        err => throwError(err, () => this.setState({ newMessage: ''}))
      );
    }
  }

  handleChangeMessage({ target }) {
    this.setState({ newMessage: target.value });
  }

  handleChangeRoom({ target }) {
    this.setState({ newRoom: target.value });
  }

  handleJoinClick() {
    this.setState({ joinIsOpen: !this.state.joinIsOpen })
  }

  handleJoinRoom(e) {
    e.preventDefault();
    const { newRoom: title } = this.state;
    const { username, room } = this.props;
    leaveOrRemove.call(
      { username, _id: room._id },
      err => throwError(err, () => {
        createOrJoin.call(
          { title, username },
          (err, roomId) => throwError(err, () => this.props.router.push(`/room/${roomId}`))
        );

        this.handleJoinClick();
      })
    );
  }

  render() {
    if (!this.props.isReady) {
      return <div>Loading...</div>
    }

    const { room } = this.props;
    return (
      <div>
        <RoomHeader roomTitle={room.title} />

        <Row>
          <MessageList messages={room.messages} />

          <MemberList
            members={room.members}
            username={this.props.username}
            onJoinClick={this.handleJoinClick}
            onSubmitChange={this.handleJoinRoom}
            onChangeTitle={this.handleChangeRoom}
            isOpen={this.state.joinIsOpen}
            roomTitle={this.state.newRoom}
          />
        </Row>

        <Form onSubmit={this.handleAddMessage}>
          <Row>
            <Col sm="9">
              <Input
                onChange={this.handleChangeMessage}
                value={this.state.newMessage}
                placeholder="Type here..."
              />
            </Col>
            <Col sm="3">
              <Button disabled={!this.state.newMessage.length}>TALK!</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default createContainer((props) => {
  const { roomId } = props.params;
  const isReady = Meteor.subscribe('rooms.one', roomId).ready();
  return {
    isReady,
    room: isReady ? Rooms.findOne(roomId) : {},
  };
}, RoomPage);

