const mongoose = require('mongoose')

const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env

const uri = NODE_ENV === 'test'
    ? MONGO_URI_TEST
    : MONGO_URI

mongoose.connect(uri)
    .then(() => {
        console.log('database is connected')
    }).catch((err) => {
        console.log(err)
    })

module.exports = mongoose
