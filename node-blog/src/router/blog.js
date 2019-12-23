const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")

const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel("尚未登陆")
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const id = req.query.id
  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {

    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const result = getList(author, keyword);
    return result.then(listData => (new SuccessModel(listData)))
  }

  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetail(id)
    return result.then(data => (new SuccessModel(data)))
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    const loginResult = loginCheck(req);
    if (loginResult) {
      return loginResult
    }

    req.body.author = req.session.username;

    const result = newBlog(req.body);
    return result.then(data => (new SuccessModel(data)))
  }

  if (method === "POST" && req.path === "/api/blog/update") {
    const loginResult = loginCheck(req);
    if (loginResult) {
      return loginResult
    }

    return updateBlog(id, req.body)
      .then(val => {
        if (val) {
          return new SuccessModel(val)
        }
        return new ErrorModel("更新blog失败")
      })
  }

  if (method === "POST" && req.path === "/api/blog/del") {
    const loginResult = loginCheck(req);
    if (loginResult) {
      return loginResult
    }

    req.body.author = req.session.username;
    return delBlog(id, author)
      .then(val => {
        if (val) {
          return new SuccessModel(val)
        }
        return new ErrorModel("删除blog失败")
      })
  }
}

module.exports = handleBlogRouter;