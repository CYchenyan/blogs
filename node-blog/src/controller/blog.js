const getList = (author, keyword) => {
  //先返回正确格式的假数据

  return [
    {
      id: 1,
      title: "标题a",
      content: "内容a",
      createTime: 1575002381914,
      author: "cy"
    },
    {
      id: 1,
      title: "标题b",
      content: "内容b",
      createTime: 1575002323232,
      author: "cy"
    }
  ]
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

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}