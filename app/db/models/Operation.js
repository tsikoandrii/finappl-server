import mongoose from 'mongoose'

const { Schema, ObjectId, model } = mongoose

const OperationSchema = new Schema(
  {
    id: {
      type: ObjectId,
    },
    type: {
      type: 'String',
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    account: {
      type: ObjectId,
      ref: 'Account',
    },
    value: {
      type: 'Number',
    },
    currency: {
      type: 'String',
      default: 'uah',
    },
    description: {
      type: 'String',
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
)

export default model('Operation', OperationSchema)
