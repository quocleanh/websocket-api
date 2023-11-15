const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Tạo một HTTP server để xử lý API
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Tạo một WebSocket server, lắng nghe trên cùng một server HTTP
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Gửi tin nhắn đến client khi có kết nối mới
  ws.send('WebSocket connection established');
});

// Khi có yêu cầu POST đến endpoint '/api', forward dữ liệu lên WebSocket
app.post('/api', express.json(), (req, res) => {
  const data = req.body;

  // Gửi dữ liệu lên tất cả các clients đang kết nối
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });

  // Trả về phản hồi cho client gửi yêu cầu POST
  res.json({ success: true, message: 'Data forwarded to WebSocket' });
});
app.get('/', (req, res) => {
  res.send('Welcome to WebSocket API');
});
// Nối WebSocket server với server HTTP
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
