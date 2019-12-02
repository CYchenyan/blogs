const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const id = req.query.id
  // 获取博客列表
  if(method === "GET" && req.path === "/api/blog/list"){
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData)
  }

  if(method === "GET" && req.path === "/api/blog/detail" ){
    const data = getDetail(id)
    return new SuccessModel(data);
  }

  if(method === "POST" && req.path === "/api/blog/new"){
      const postData = newBlog(req.body);
      return new SuccessModel(postData)
  }

  if(method === "POST" && req.path === "/api/blog/update"){
    const updateResult = updateBlog(id, req.body)
    if(updateResult){
      return new SuccessModel(updateResult)
    }
    return new ErrorModel("更新blog失败")
  }

  if(method === "POST" && req.path === "/api/blog/del"){
    return {
      meg: "删除博客"
    }
  }
}

module.exports = handleBlogRouter;