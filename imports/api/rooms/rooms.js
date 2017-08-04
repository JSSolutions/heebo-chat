import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { roomSchema } from "./schemas";

export const Rooms = new Mongo.Collection('rooms');

Rooms.deny({
  insert() { return true },
  remove() { return true },
  update() { return true },
});

Rooms.attachSchema(roomSchema);

export const COMMON_ROOM_TITLE = 'COMMON ROOM';