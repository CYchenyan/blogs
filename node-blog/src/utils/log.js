const fs = require("fs");
const path = require("path");

function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a"
  })
  return writeStream
}

function writeLog(stream, log){
  stream.write(log + "\n")
}

const accessWriteStream = createWriteStream("access.log");
// 写入访问日志
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}