import mongoose from 'mongoose'

const { Schema, ObjectId, model } = mongoose

const TokenSchema = new Schema(
  {
    id: {
      type: ObjectId,
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    refresh: {
      type: 'String',
    },
  },
  { timestamps: true }
)

TokenSchema.methods = {}

TokenSchema.virtual('password')

export default model('Token', TokenSchema)
