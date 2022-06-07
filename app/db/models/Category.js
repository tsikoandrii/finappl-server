import mongoose from 'mongoose'

const { Schema, ObjectId, model } = mongoose

const CategorySchema = new Schema(
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
    },
    type: {
      type: 'String',
    },
  },
  { timestamps: true }
)

export default model('Category', CategorySchema)
