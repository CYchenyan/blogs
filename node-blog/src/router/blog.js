const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")

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
    // TODO 待开发登录时修改author假数据， 登录后获取登陆名
    const author = "chenyan"
    req.body.author = author;

    const result = newBlog(req.body);
    return result.then(data => (new SuccessModel(data)))
  }

  if (method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(id, req.body)
      .then(val => {
        if (val) {
          return new SuccessModel(val)
        }
        return new ErrorModel("更新blog失败")
      })
  }

  if (method === "POST" && req.path === "/api/blog/del") {
     // TODO 待开发登录时修改author假数据， 登录后获取登陆名
     const author = "chenyan"
     req.body.author = author;

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