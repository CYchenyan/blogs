const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const { set } = require("../db/redis")

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 操作cookie
        req.session.username = data.username
        req.session.realname = data.realname
        // 同步redis session
        set(req.sessionId, req.session)

        return new SuccessModel(data)
      }
      return new ErrorModel("登陆失败")
    })
  }

  // 登陆验证测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    console.log("test", req.session)
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    } else {
      return Promise.resolve(
        new ErrorModel("尚未登陆！")
      )
    }
  }
}

module.exports = handleUserRouter;