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
    const data = getDetail(id)
    return new SuccessModel(data);
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    const postData = newBlog(req.body);
    return new SuccessModel(postData)
  }

  if (method === "POST" && req.path === "/api/blog/update") {
    const updateResult = updateBlog(id, req.body)
    if (updateResult) {
      return new SuccessModel(updateResult)
    }
    return new ErrorModel("更新blog失败")
  }

  if (method === "POST" && req.path === "/api/blog/del") {
    const delResult = delBlog(id);
    if(delResult){
      return new SuccessModel(delResult)
    }
    return "删除blog失败"
  }
}

module.exports = handleBlogRouter;