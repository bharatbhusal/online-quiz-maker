const jwt = require('jsonwebtoken');
const env = require('../utils/validateEnv')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401)

    jwt.verify(token, env.ACCESS_TOKEN_SECRECT, (err, user) => {
        if (err) return res.status(403)
        req.user = user
        next()
    })
};

module.exports = {
    authenticateToken
}