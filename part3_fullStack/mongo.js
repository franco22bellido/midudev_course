const mongoose = require('mongoose')

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'

const connectDB = () => {
    return mongoose.connect(uri)
        .then(() => {
            console.log('database is connected')
        }).catch((err) => {
            console.log(err)
        })
}
module.exports = connectDB
