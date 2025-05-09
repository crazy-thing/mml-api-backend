const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  name: 'MML Api Server',
  description: 'Api Server For The Minecraft Migos Launcher',
  script: path.join(__dirname, 'server.js') 
});

const option = process.argv[2];

switch (option) {
  case 'install':
    installService();
    break;
  case 'uninstall':
    uninstallService();
    break;
  default:
    console.log('Usage: node service.js install|uninstall');
}

function installService() {
  svc.install();

  svc.on('install', function () {
    svc.start();
    console.log('Service installed and started successfully.');
  });

  svc.on('error', function (err) {
    console.error('Error installing service:', err);
  });

  svc.on('uninstall', function () {
    console.log('Service uninstalled successfully.');
  });
}

function uninstallService() {
  svc.uninstall();
}