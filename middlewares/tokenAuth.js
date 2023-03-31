const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            message: "Please login to access this part of the website"
        });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decodedToken
    } catch (err) {
        res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
    return next();
};

module.exports = verifyToken;