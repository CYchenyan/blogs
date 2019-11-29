const { getList, getDetail } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if(method === "GET" && req.path === "/api/blog/list"){
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData)
  }

  if(method === "GET" && req.path === "/api/blog/detail" ){
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data);
  }

  if(method === "POST" && req.path === "/api/blog/new"){
    return {
      meg: "新建博客"
    }
  }

  if(method === "POST" && path === "api/blog/update"){
    return {
      meg: "更新博客"
    }
  }

  if(method === "POST" && path === "api/blog/del"){
    return {
      meg: "删除博客"
    }
  }
}

module.exports = handleBlogRouter;