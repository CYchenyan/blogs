const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 获取cookie过期时间
const getCookieExpies = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 *1000));
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

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userId;
  console.log("userId", userId)
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId]

  //  处理postData
  getPostData(req).then(postData => {
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