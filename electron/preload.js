const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  sayHello: () => console.log('Hello from main process!'),
});