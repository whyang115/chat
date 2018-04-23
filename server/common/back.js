module.exports = {
  success: {
    returnCode: 1,
    returnMessage: "success"
  },
  userExist: {
    returnCode: 0,
    returnMessage: "user is been existed"
  },
  userUnExist: {
    returnCode: 0,
    returnMessage: "user is unExist, please register first"
  },
  databaseError: {
    returnCode: 0,
    returnMessage: "database unexpected error"
  },
  serverError: {
    returnCode: 0,
    returnMessage: "server unexpected error"
  }
};
