import { Meteor } from 'meteor/meteor';
import { Rooms, COMMON_ROOM_TITLE } from '/imports/api/rooms/rooms';

Meteor.startup(() => {
  if (!Rooms.find().count()) {
    Rooms.insert({
      title: COMMON_ROOM_TITLE,
      members: [],
      messages: [],
    });
  }
});