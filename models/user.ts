import mongoose, { Schema, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = models.User || mongoose.model('User', UserSchema);

export default User;
