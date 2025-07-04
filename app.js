const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;
// 中间件配置
app.use(cors());
app.use(express.json());


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
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(201).json({ error: 'Email already exists', msg: '邮箱已被注册' });
    }
    if (err.code === 'ER_BAD_NULL_ERROR') {
      return res.status(201).json({ error: 'Name and email are required', msg: '请输入值' });
    }

    else if (err.code === 'ER_DATA_TOO_LONG') {
      return res.status(201).json({ error: 'Data too long for column', msg: '数据过长' });
    }
    else if (err.code === 'ER_NO_DEFAULT_FOR_FIELD') {
      return res.status(201).json({ error: 'Field does not have a default value', msg: '字段没有默认值' });
    }
    else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(201).json({ error: 'Foreign key constraint fails', msg: '外键约束失败' });
    }
    else if (err.code === 'ER_BAD_FIELD_ERROR') {
      return res.status(201).json({ error: 'Unknown column', msg: '未知列' });
    }
    else if (err.code === 'ER_PARSE_ERROR') {
      return res.status(201).json({ error: 'SQL syntax error', msg: 'SQL语法错误' });
    }
    else {
      return res.status(400).json({ error: 'Database query failed', msg: '未知错误' });
    }
  }
});

//登录
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username == 'www' && password == 'www') {
      res.status(200).json({
        "code": 200,
        "user": {
          "username": "www",
          "userid": "67d0ecc2eafa337e6f1fac6d",
          "avatar": "https://tse4-mm.cn.bing.net/th/id/OIP-C.AsfuU6ZaEg90ndcs4Vv1YwAAAA?w=203&h=203&c=7&r=0&o=5&dpr=1.5&pid=1.7"
        },
        "message": "Login successful"
      });


    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
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