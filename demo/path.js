const path = require('path');
const fs = require('fs');

// 获取当前目录的绝对路径  
const currentDir = path.resolve(__dirname);
console.log('当前目录的绝对路径:', currentDir);

//可以进行自由的路径拼接
const filePath = path.join(currentDir,'aaaa', 'example.txt');
console.log('拼接后的文件路径:', filePath);

//获取文件的目录名和基本名
console.log('文件的目录名:', path.dirname(filePath));
console.log('文件的基本名:', path.basename(filePath));
console.log('文件的绝对路径:', path.resolve(filePath));
console.log('文件的扩展名:', path.extname(filePath));
console.log('文件是否存在:', fs.existsSync(filePath));

console.log(path.parse(filePath));
// 输出:
