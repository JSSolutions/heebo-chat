import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { messagesSchema } from "./schemas";

export const Messages = new Mongo.Collection('messages');

Messages.deny({
  insert() { return true },
  remove() { return true },
  update() { return true },
});

Messages.attachSchema(messagesSchema);
