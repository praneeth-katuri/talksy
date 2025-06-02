require("dotenv").config();

const config = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV,
  },
  db: {
    dbUri: process.env.DB_URI,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  },
};

module.exports = config;
