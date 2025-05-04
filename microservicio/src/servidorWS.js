// src/servidorWS.js
const WebSocket = require('ws');
const { crearDocumento } = require('./documentosClient');

const wss = new WebSocket.Server({ port: 4001 }, () => {
  console.log('✅ Servidor WebSocket escuchando en ws://localhost:4001');
});

wss.on('connection', (ws) => {
  console.log('📡 Cliente conectado');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.tipo === 'crearDocumento' && data.documento) {
        console.log('📨 Recibido documento:', data.documento);

        const resultado = await crearDocumento(data.documento);

        ws.send(JSON.stringify({
          tipo: 'respuesta',
          estado: 'ok',
          mensaje: 'Documento creado con éxito',
          datos: resultado,
        }));
      } else {
        ws.send(JSON.stringify({
          tipo: 'error',
          mensaje: 'Formato no válido. Se esperaba tipo="crearDocumento" y un objeto documento.',
        }));
      }
    } catch (error) {
      ws.send(JSON.stringify({
        tipo: 'error',
        mensaje: 'Error procesando solicitud: ' + error.message,
      }));
    }
  });

  ws.on('close', () => {
    console.log('🔌 Cliente desconectado');
  });
});
