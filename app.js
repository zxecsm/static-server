import os from 'os';
import fs from 'fs';
import express from 'express';

const app = express();

const staticDir = `${os.homedir().replace(/\\/g, '/')}/static`;

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
}

app.use(express.static(staticDir));

const port = 33333;

app.listen(port, () => {
  const arr = getLocahost().map(
    (item) => `http://${item}${port === 80 ? '' : `:${port}`}`
  );
  console.log(`服务开启成功，访问地址为：\n${arr.join('\n')}`);
});

function getLocahost() {
  const obj = os.networkInterfaces();
  let arr = [];
  Object.keys(obj).forEach((item) => {
    let value = obj[item];
    if (Object.prototype.toString.call(value).slice(8, -1) === 'Array') {
      arr = [
        ...arr,
        ...value
          .filter((item) => item.family === 'IPv4')
          .map((item) => item.address),
      ];
    }
  });
  return arr;
}
