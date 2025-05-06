// 使用连接池提升性能
const mysql = require('mysql2/promise');

//构造链接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',//连接用户名
  password: 'wh050219', //链接用户密码
  database: 'test',  //链接数据库名
  waitForConnections: true, //允许排队
  connectionLimit: 10  // 连接池大小
});

module.exports = pool;