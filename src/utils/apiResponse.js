exports.sendSuccess = (
  res,
  message = "success",
  payload = {},
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...payload,
  });
};
