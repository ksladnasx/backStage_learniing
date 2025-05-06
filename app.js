const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;
// 中间件配置
app.use(cors());
app.use(express.json());  // 解析JSON请求体[3,10](@ref)


// 获取所有用户
app.get('/users', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });
  
  // 创建用户
  app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'User creation failed' });
    }
  });

  //监听端口，这里定义的是3000，访问的也是3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // 统一错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });