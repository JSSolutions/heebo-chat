import { Meteor } from 'meteor/meteor';
import { Rooms } from './rooms';

Meteor.publish('rooms.one', function roomsOne(_id) {
  if (!_id) {
    return this.ready();
  }

  return Rooms.find({ _id });
});