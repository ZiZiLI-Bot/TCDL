export const success = (res, data, status, message) => {
  return res.status(status || 200).json({
    success: true,
    message: message || 'Request successful',
    data: data,
  });
};

export const error = (res, error, message) => {
  return res.status(200).json({
    success: false,
    message: message || 'Request failed',
    error: error?.message,
  });
};
