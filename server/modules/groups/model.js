import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name : {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Name must be 5 character long']
  },
  description : {
    type: String,
    required: true,
    minlength: [10, 'Descript must be 10 character long']
  },
  category : {
    type: String
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup'
  }]
}, { timestamps: true });

GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');

  const group = await this.findById(id);

  const meetup = await new Meetup({ ...args, group });

  group.meetups.unshift(meetup);

  // console.log(group)

  const result = await Promise.all([meetup.save(), group.save()]);

  //console.log(result)
  return result;
};

export default mongoose.model('Group', GroupSchema);
