const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { set, get } = require("./src/db/redis");
const { access } = require("./src/utils/log")

// 获取cookie过期时间
const getCookieExpies = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ""
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on("end", () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })

  })
}
const SESSION_DATA = {};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");

  // 记录访问日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

  // 获取path
  req.path = req.url.split("?")[0];

  // 解析query
  req.query = querystring.parse(req.url.split("?")[1]);

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(item => {
    if (!item) return
    const arr = item.split("=");
    const key = arr[0];
    const val = arr[1];
    req.cookie[key] = val;
  })

  // redis 存贮session
  let needSetCookie = false;
  let userId = req.cookie.userId;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {})
  }

  get(userId)
    .then(sessionData => {
      if (sessionData === null) {
        set(userId, {});
        req.session = {}
      } else {
        req.session = sessionData
      }
      req.sessionId = userId
      //  处理postData
      return getPostData(req)
    })
    .then(postData => {
      req.body = postData

      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpies()}`)
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpies()}`)
          }
          res.end(JSON.stringify(userData))
        })

        return
      }

      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found\n");
      res.end();
    })

}

module.exports = serverHandle;