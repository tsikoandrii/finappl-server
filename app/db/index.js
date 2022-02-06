import mongoose from 'mongoose'
import config from 'config'

const MONGO_URI = config.get('MONGO_URI')

// Set up default mongoose connection
const connect = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Get the default connection
  const db = mongoose.connection

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

export default { connect }
