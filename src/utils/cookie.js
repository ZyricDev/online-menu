const config = require("../config/env");
exports.setTokenCookies = (res, accessToken, refreshToken) => {
  const cookieOptionals = {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: "strict",
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptionals,
    maxAge: config.auth.accessTokenExpiresInMinute * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptionals,
    maxAge: config.auth.refreshTokenExpiresInDay * 24 * 60 * 60 * 1000,
  });
};
