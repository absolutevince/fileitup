const formatRegistrationErrors = (errors) => {
  if (!errors) {
    console.log("no error messages");
    return;
  }
  const errorMessages = {};
  errors.forEach((error) => {
    errorMessages[error.path] = error.msg;
  });
  return errorMessages;
};

module.exports = { formatRegistrationErrors };
