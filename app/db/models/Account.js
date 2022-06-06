import mongoose from 'mongoose'

const { Schema, ObjectId, model } = mongoose

const AccountSchema = new Schema(
  {
    id: {
      type: ObjectId,
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    name: {
      type: 'String',
      required: true,
    },
    balance: {
      type: 'Number',
      default: 0,
    },
    currency: {
      type: 'String',
      default: 'uah',
    },
    operations: [
      {
        type: ObjectId,
        ref: 'Operation',
      },
    ],
    theme: {
      background: {
        type: 'String',
        default: 'black',
      },
    },
  },
  { timestamps: true }
)

export default model('Account', AccountSchema)
