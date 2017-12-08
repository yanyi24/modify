const http = require('http');
const config = require('./src/config/defaultConfig');

const server = http.createServer((req,res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	res.end('Hello');
});

server.listen(config.port,config.hostname,(err) => {
	console.info(`Server is running at http://${config.hostname}:${config.port} `);
	if(err) throw err;
});