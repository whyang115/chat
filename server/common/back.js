module.exports = {
  success: {
    returnCode: 1,
    returnMessage: "请求成功"
  },
  userExist: {
    returnCode: 0,
    returnMessage: "此用户已存在,请直接登陆"
  },
  userUnExist: {
    returnCode: 0,
    returnMessage: "用户不存在,请注册"
  },
  error: {
    returnCode: 0,
    returnMessage: ""
  }
};
