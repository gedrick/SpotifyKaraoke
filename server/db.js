let settings
if (process.env.NODE_ENV === 'production') {
  settings = require('./config.prod')
} else {
  settings = require('./config')
}

const db = mongoose => {
  mongoose.connect(
    settings.mongo.url,
    {
      useNewUrlParser: true
    }
  )

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
  })

  mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error: ' + err)
  })
}

module.exports = db
