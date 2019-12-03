const loginCheck = (username, password) => {
  if(username === "zhangshan" && password === "123"){
    return true
  }
  return false
}

module.exports = {
  loginCheck
}