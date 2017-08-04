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
      return Rooms.update(
        { _id: room._id },
        { $addToSet: { members: username } }
      );
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

    if (room.members.length > 1) {
      return Rooms.update({ _id }, { $pull: { members: username } });
    } else if (!isCommon(room)) {
      return Rooms.remove(_id);
    }
  },
});

export const addMessage = new ValidatedMethod({
  name: 'rooms.addMessage',
  validate: new SimpleSchema({
    _id: roomSchema.schema('_id'),
    message: roomSchema.schema('messages.$'),
  }).validator(),
  run({ _id, message }) {
    const room = Rooms.findOne(_id);
    if (!room) {
      throw new Meteor.Error('rooms.addMessage', 'No rooms with such ID.');
    }

    return Rooms.update({ _id }, { $addToSet: { messages: message } });
  },
});