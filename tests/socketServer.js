import { Server } from 'socket.io';

export const createMockSocketServer = async (server, events) => {
  const io = new Server(server);
  return new Promise((resolve) => {
    try {
      io.on('connection', (socket) => {
        events.map((item) => {
          socket.emit(item.event, item.message);
        });
        resolve(io);
      });
    } catch (e) {
      resolve('ERROR ' + e);
    }
  });
};

export const emitEvents = async (ioServer, events) => {
  try {
    events.map((item) => {
      ioServer.emit(item.event, item.message);
    });
  } catch (e) {
    console.log('emit error:', e);
  }
};
