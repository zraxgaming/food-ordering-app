import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  name: {type: String},
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: (password: string) => {
      if (!password.length || password.length < 5) {
        new Error('Password must be at least 5 characters');
        return false;
      }
    }
  },
  image: {type:String}
}, { timestamps: true });

UserSchema.post('validate', function (user) {
  const unHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(unHashedPassword, salt);
})

export const User = models?.User || model('User', UserSchema);