import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from 'config'
import expressIP from 'express-ip'
import RedisService from './services/redis.service'

import db from './db'
import routes from './routes'

import ErrorHandler from './middlewares/error'

// Constants
const PORT = process.env.PORT || config.get('PORT')

// Init application
const app = express()

// Connect to database
db.connect()

// Set middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressIP().getIpInfoMiddleware)

app.use('/api', routes)

app.use(ErrorHandler)

// Start application
app.listen(PORT, () => {
  console.log(`Application has been started on http://localhost:${PORT}`)
})
