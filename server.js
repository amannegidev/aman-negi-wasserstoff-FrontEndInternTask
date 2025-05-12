import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3001 });
let currentContent = '<p>Start collaborating! 🚀</p>';

const broadcast = (excludeWs, content, username) => {
  wss.clients.forEach(client => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'content-update', content, username }));
    }
  });
};

const sendToClient = (ws, content) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'content-update', content, username: 'system' }));
  }
};

wss.on('connection', (ws) => {
  // Send current content to new client
  sendToClient(ws, currentContent);

  const messageHandler = (data) => {
    try {
      const message = JSON.parse(data.toString());
      if (message.type === 'content-update' && message.content) {
        currentContent = message.content;
        broadcast(ws, currentContent, message.username);
      }
    } catch (error) {
      console.error('Message processing error:', error);
    }
  };

  const cleanup = () => {
    ws.off('message', messageHandler);
    ws.off('close', cleanup);
    ws.off('error', cleanup);
  };

  ws.on('message', messageHandler);
  ws.on('close', cleanup);
  ws.on('error', cleanup);
});

console.log('WebSocket server running on ws://localhost:3001');