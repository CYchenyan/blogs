const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author='${author}' `
  }

  if(keyword){
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  return exec(sql);
}

const getDetail = (id) => {
  return {
    id: 1,
    title: "标题a",
    content: "内容a",
    createTime: 1575002381914,
    author: "cy"
  }
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title, content的属性

  return {
    id: 3 // 表述新建博客，插入到数据表里面的id
  }
}

const updateBlog = (id, blogData={}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}