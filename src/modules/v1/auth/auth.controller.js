const { sendSuccess } = require("../../../utils/apiResponse");
const { setTokenCookies } = require("../../../utils/cookie");
const authService = require("./auth.service");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { accessToken, refreshToken } = await authService.login(
      username,
      password,
    );

    setTokenCookies(res, accessToken, refreshToken);

    return sendSuccess(res, "Login success");
  } catch (err) {
    next(err);
  }
};
