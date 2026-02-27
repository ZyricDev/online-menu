const bcrypt = require("bcrypt");

const authRepository = require("./auth.repository");
const ApiError = require("../../../utils/ApiError");
const token = require("../../../utils/token");

exports.login = async (username, password) => {
  const user = await authRepository.findByUsername(username);

  if (!user) {
    throw new ApiError("Invalid username or password");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    throw new ApiError("Invalid username or password");
  }

  const accessToken = token.generateAccessToken(user.id, user.role);
  const refreshToken = token.generateRefreshToken(user.id);

  return { accessToken, refreshToken };
};
