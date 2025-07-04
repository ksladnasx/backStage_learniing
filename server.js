const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 设置静态文件目录,进行静态资源托管
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件在 public 目录下


// 中间件配置
app.use(express.json()); // 将请求参数都解析 JSON 请求体
app.use(express.urlencoded({ extended: true })); // 解析 URL 编码请求体
app.use(cors()); // 允许跨域请求
const requestIp = require('request-ip');
app.use(requestIp.mw()); // 中间件模式



// 路由配置
app.get('/ww', (req, res) => {
    console.log('Received a GET request on /ww:', req.query);
    const clientIP = req.clientIp
    console.log('Client IP:', clientIP);
    res.send('Hello, World!');
});
app.post('/add', (req, res) => {
    const id = parseInt(req.body.id);   
    const todo = jsonData.find(item => item.id === id);
 }) 

app.get('/download',(req,res)=>{
    const name = req.query.name
    const fliepath = path.resolve(path.join('filedata',`${name}.txt`))
    if(!fs.existsSync(fliepath)) {
        return res.status(404).send('File not found');
    }else{
        res.sendFile(fliepath)
    }
    
})
// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});