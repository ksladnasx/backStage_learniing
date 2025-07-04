const fs = require('fs');
const path = require('path');

// 读取文件内容
const filePath = path.join(__dirname, 'example.txt');
fs.readFile(filePath, 'utf8', (err, data) => {  // 使用 utf8 编码读取文件,异步的方式读取文件
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

const {readFile} = require('fs/promises');
// 使用 promises API 读取文件
async function readFileAsync() {
    try {
        const data = await readFile(filePath, 'utf8');  // 使用 utf8 编码读取文件
        console.log('File content (async):', data);
    } catch (err) {
        console.error('Error reading file (async):', err);
    }
}


//流的方式
const { createReadStream } = require('fs');
const readStream = createReadStream(filePath, { encoding: 'utf8' });  // 使用 utf8 编码读取文件
readStream.on('data', (chunk) => {
    console.log('File content (stream):', chunk);
});

readStream.on('end', () => {
    console.log('Finished reading file.');
});


