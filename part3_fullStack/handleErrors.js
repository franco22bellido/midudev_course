const handleErrors = (err, req, res, next) => {
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'objectId malformed' })
    }
    return res.status(500).json({ message: err.name })
}

module.exports = handleErrors
