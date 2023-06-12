import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    firstName: { type: String, default: 'bottt' },
    lastName: { type: String, default: '' },
    image: { type: String, default: '' },
    address: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    dayOfBirth: { type: Date, default: Date.now },
    productSold: { type: Array },
  },
  {
    timestamps: true,
  },
);

export default models.User || model('User', UserSchema);
