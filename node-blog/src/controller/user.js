const {exec, escape} = require("../db/mysql")

const login = (username, password) => {
  username = escape(username)
  password = escape(password)
  const sql = `
    select username,realname from users where username='${username}' && password='${password}'
  `
  return exec(sql).then(rows => (rows[0] || {}));
}

module.exports = {
  login
}