import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, ObjectId, model } = mongoose

/** User Model

 * * */

const UserSchema = new Schema(
  {
    id: {
      type: ObjectId,
    },
    email: {
      type: 'String',
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: 'String',
    },
  },
  { timestamps: true }
)

UserSchema.methods = {
  hashPassword: async (password) => {
    return await bcrypt.hashSync(password, 10)
  },
  passwordIsMatch: async (password, hash) => {
    return await bcrypt.compareSync(password, hash)
  },
}

UserSchema.virtual('password').set(async function (password) {
  this.hashedPassword = await this.hashPassword(password)
})

export default model('User', UserSchema)
