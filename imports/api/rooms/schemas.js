import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Random } from 'meteor/random';

export const roomSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
    min: 1,
    max: 30,
  },
  members: {
    type: [String],
  },
  'members.$': {
    type: String,
    min: 1,
    max: 30,
  },
  messages: {
    type: [Object],
  },

  'messages.$._id': {
    type: String,
    autoValue() {
      return Random.id();
    },
  },
  'messages.$.username': {
    type: String,
    defaultValue: 'no-name',
    min: 1,
    max: 30,
  },
  'messages.$.body': {
    type: String,
    min: 1,
    max: 255,
  },
  'messages.$.createdAt': {
    type: Date,
    autoValue(){
      return new Date();
    },
    optional: true,
  }
});
