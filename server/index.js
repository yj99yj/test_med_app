const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8181;


// 미들웨어
app.use(express.json());
app.use(cors());

// MongoDB에 연결
connectToMongo();

// 라우트
app.use('/api/auth', require('./routes/auth'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 서버 시작
app.listen(PORT, () => {
console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
