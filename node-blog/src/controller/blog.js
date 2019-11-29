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

module.exports = {
  getList,
  getDetail
}