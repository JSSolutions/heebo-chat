import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const roomSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  title: {
    type: String,
    defaultValue: 'Default room',
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
});