const config = require("../config/env");

const isProduction = config.app.nodeEnv === "production";

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  const logDetails = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    ...(err.errors && { errors: err.errors }),
    ...(!isProduction && { stack: err.stack }),
  };

  if (statusCode >= 500) console.error(`[ERROR] ${err.message}`, logDetails);
  else console.warn(`[WARN] ${err.message}`, logDetails);

  return res.status(statusCode).json({
    status,
    message:
      statusCode === 500 && !err.isOperational && isProduction
        ? "Something went wrong"
        : err.message,
    ...(err.errors && { errors: err.errors }),
    ...(!isProduction && { stack: err.stack }),
  });
};
