import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const messagesSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  roomId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});