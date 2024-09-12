import { ROLE } from '@shared/enum/roles';
import mongoose, { Schema } from "mongoose";


const userSchema = new Schema( {
  alias: {
    type: String,
    required: [ true, "alias is required" ],
    unique: true,
  },
  email: {
    type: String,
    required: [ true, "Email is required" ],
    unique: true,
  },
  role: {
    type: [ String ],
    default: ROLE.READERS,
    enum: ROLE,
  },
} );
export const UserModel = mongoose.model( "User", userSchema );
