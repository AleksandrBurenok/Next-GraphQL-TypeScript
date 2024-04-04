const errHander = ({ err, errorData, helperText }) => {
  console.error(err.message, 'apollo query error', helperText);
  return errorData || null;
};

export const apolloQuery = ({ callback, errorData = null, helperText }) => {
  try {
    return callback()
      .then((data) => data)
      .catch((err) => errHander({ err, errorData, helperText }));
  } catch (err) {
    return errHander({ err, errorData, helperText });
  }
};
