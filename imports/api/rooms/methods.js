import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Rooms, COMMON_ROOM_TITLE } from './rooms';
import { roomSchema } from './schemas';

const isCommon = room => room.title === COMMON_ROOM_TITLE;

export const createOrJoin = new ValidatedMethod({
  name: 'rooms.createOrJoin',
  validate: new SimpleSchema({
    title: roomSchema.schema('title'),
    username: roomSchema.schema('members.$'),
  }).validator(),
  run({ title, username }) {
    const room = Rooms.findOne({ title });
    if (room) {
      if (room.members.includes(username)) {
        throw new Meteor.Error('rooms.createOrJoin', 'This username allready exists');
      }

      Rooms.update(
        { _id: room._id },
        { $addToSet: { members: username } }
      );
      return room._id;
    } else {
      return Rooms.insert({
        title,
        members: [username],
        messages: [],
      });
    }
  },
});

export const leaveOrRemove = new ValidatedMethod({
  name: 'rooms.leaveOrRemove',
  validate: new SimpleSchema({
    _id: roomSchema.schema('_id'),
    username: roomSchema.schema('members.$'),
  }).validator(),
  run({ _id, username }) {
    const room = Rooms.findOne(_id);
    if (!room) {
      throw new Meteor.Error('rooms.leaveOrRemove', 'No rooms with such ID.');
    }

    if (room.members.length > 1 || isCommon(room)) {
      return Rooms.update({ _id }, { $pull: { members: username } });
    } else {
      return Rooms.remove(_id);
    }
  },
});

export const addMessage = new ValidatedMethod({
  name: 'rooms.addMessage',
  validate: new SimpleSchema({
    _id: roomSchema.schema('_id'),
    body: roomSchema.schema('messages.$.body'),
    username: roomSchema.schema('messages.$.username'),
  }).validator(),
  run({ _id, username, body }) {
    const room = Rooms.findOne(_id);
    if (!room) {
      throw new Meteor.Error('rooms.addMessage', 'No rooms with such ID.');
    }

    const messages = { username, body };

    return Rooms.update({ _id }, { $addToSet: { messages } });
  },
});