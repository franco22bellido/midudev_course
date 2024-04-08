const handler = {
    CastError: (res) => { return res.status(400).json({ message: 'objectId malformed' }) },
    JsonWebTokenError: (res) => { return res.status(401).json({ message: 'invalid token' }) }
}

const handleErrors = (err, req, res, next) => {
    if (err.name) {
        return handler[err.name](res)
    }
    return res.status(500).json({ message: err })
}

module.exports = handleErrors
