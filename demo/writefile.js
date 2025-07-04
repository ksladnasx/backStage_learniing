const fs = require('fs');
const path = require('path');
// 写入

const dirname = path.join(__dirname, '1', '2', '3'); // 目录路径
const writeFilePath = path.join(dirname, 'write.txt'); // 文件路径
// 如果没有该目录，递归模式创建目录及其父目录
if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });  
}
//异步写入文件
fs.writeFile(writeFilePath, 'Hello, World!', 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully.');
});

for(i = 0; i < 10; i++) { //异步追加写入
    fs.appendFile(writeFilePath, `\nLine ${i + 1}`, 'utf8', (err) => {
        if (err) {
            console.error('Error appending to file:', err);
            return;
        }
        console.log(`Line ${i + 1} appended successfully.`);
    });
}


//流的方式写入
// //创建流，此时可配置是否是追加写入（{flags:'a'}）还是覆盖写入，默认是覆盖写入
// const wStream = fs.createWriteStream('1/2/streamwrite.txt') 
// //监听
// wStream.on('open',()=>{
//     //填充长度为5000的数组利用他的索引来遍历写入文件
//     Array(5000).fill().map((item,index) =>{
//         if(index  %2 == 0){
//             wStream.write('别卷我别卷我QwQ,www,')
//         }else{
//             wStream.write('QAQ不要卷我不要卷我QwQ\n')
//         }
        
//     })
//     //结束流
//     wStream.end()
// })
// //监听流的结束
// wStream.on('finish',()=>{
//     console.log('数据写入成功！')
// })