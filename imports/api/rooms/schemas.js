import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const roomSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
    min: 5,
    max: 30,
  },
  members: {
    type: [String],
  },
  'members.$': {
    type: String,
    min: 2,
    max: 30,
  },
  messages: {
    type: [Object],
  },
  'messages.$.username': {
    type: String,
    defaultValue: 'no-name',
    min: 2,
    max: 30,
  },
  'messages.$.body': {
    type: String,
    min: 1,
    max: 255,
  },
  'messages.$.createdAt': {
    type: Date,
    defaultValue: new Date(),
    optional: true,
  }
});
