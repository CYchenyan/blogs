const xss = require("xss");
const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }

  sql += `order by createtime desc;`

  return exec(sql);
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => (rows[0]))
}

const newBlog = (blogData = {}) => {
  // blogData是一个博客对象，包含title, content, author 的属性
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = xss(blogData.author)
  const createtime = Date.now();
  const sql = `
    insert into blogs(title, content, author, createtime)
     values('${title}', '${content}', '${author}', ${createtime})
  `

  return exec(sql).then(insertData => ({ id: insertData.insertId }))
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const sql = `
    update blogs set title='${title}',content='${content}' where id='${id}'
  `
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}