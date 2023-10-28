import { Server } from 'socket.io';

export const createMockSocketServer = async (server, events) => {
  const io = new Server(server);
  return new Promise((resolve) => {
    try {
      io.on('connection', (socket) => {
        events.map((item) => {
          socket.emit(item.event, item.message);
        });
        resolve(socket);
      });
    } catch (e) {
      resolve('ERROR ' + e);
    }
  });
};
