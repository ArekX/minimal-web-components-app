const fs = require('fs');
const http = require('http');
const path = require('path');
const chokidar = require('chokidar');
const mimeTypes = require('mime-types');

const build = require('./es-build');
const reloadSocket = require('./reload-server');

const rootDir = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
  const filePath = path.join(rootDir, 'dist', req.url);

  try {

    if (!fs.existsSync(filePath) || fs.lstatSync(filePath).isDirectory()) {
       res.writeHead(200);
       res.end(getHtml());
       return;
    }

    res.setHeader('Content-Type', mimeTypes.lookup(filePath) || 'text/plain');
    res.writeHead(200);
    res.end(fs.readFileSync(filePath).toString()); 
  } catch (e) {
    res.end(e.message);
  }
});

console.log('Building...');

let ready = false;

const rebuild = async () => {
  if (!ready) {
    return;
  }
  console.log('Detected changes. Rebuilding...');
  await build();
  reloadSocket.forceReload();
  console.log('Done.');
};

(async () => {
  chokidar.watch([ rootDir + '/public', rootDir + '/src', ])
    .on('add', rebuild)
    .on('change', rebuild)
    .on('unlink', rebuild);

  await build();

  console.log('Serving HTML content from http://localhost:8080');
  reloadSocket.attachToServer(server);
  ready = true;
  server.listen(8080);
})();


function getHtml() {
    let html = fs.readFileSync(path.join(rootDir, 'dist/index.html')).toString();
    return html.replace('</body>', reloadSocket.getReloadScript() + '</body>');
}