const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件名
const filePath = path.join(__dirname, "../", "../", "logs", "access.log");
// 创建read stream
const readStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on("line", (lineData) => {
  if (!lineData) {
    return
  }

  // 记录总行数
  sum++;

  const arr = lineData.split(" -- ");
  if (arr[2] && arr[2].indexOf("Chrome") !== -1) {
    chromeNum++
  } 
})

rl.on("close", () => {
  console.log("chrome 占比：" + chromeNum / sum)
})