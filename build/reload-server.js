const { Server } = require("socket.io");

let attachedIo = null;

module.exports = {
   attachToServer(server) {
      const io = new Server(server, {
          pingInterval: 10000,
          pingTimeout: 5000,
          cookie: false
      });

      attachedIo = io;
   },
   getReloadScript() {
     return `
         <script src="/socket.io/socket.io.js"></script>
          <script>
            (() => {
              const socket = io();
              socket.on('forceReload', function(msg) {
                 window.location.reload();
              });
            })();
          </script>
     `;
   },
   forceReload() {
      attachedIo && attachedIo.sockets.emit('forceReload', 'do');
   }
}

