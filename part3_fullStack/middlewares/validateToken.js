const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const authorization = req.get('Authorization')
    let token = ''
    if (!authorization) return res.status(403).json({ error: 'token no provided' })
    if (authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    } else {
        return res.status(403).json({ error: 'authorization bearer malformed' })
    }
    let tokenDecoded = null
    try {
        tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id: userId } = tokenDecoded
        req.userId = userId
        next()
    } catch (e) {
        next(e)
    }
}
