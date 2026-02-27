const jwt = require("jsonwebtoken");

const config = require("../config/env");

exports.generateAccessToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role,
    },
    config.auth.accessTokenSecretKey,
    { expiresIn: config.auth.accessTokenExpiresInMinute + "m" },
  );
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    config.auth.refreshTokenSecretKey,
    { expiresIn: config.auth.refreshTokenExpiresInDay + "d" },
  );
};
