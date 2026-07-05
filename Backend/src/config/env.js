const dotenv = require('dotenv');
dotenv.config();

const env = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION
}

module.exports = env;