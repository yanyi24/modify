
const fs = require('fs');
const path = require('path');
const config = require('./src/config/defaultConfig');

const dirpath = path.join(config.root,'./testHTML');
let hrefbox = config.modifyhostname;
const fn = function(pathname){
	fs.readdir(pathname,(err,files) => {
		if(err) throw err;
		const ancherbuf = Buffer.from('<head>');
		for(let i=0;i<files.length;i++){
			const filepath = path.join(pathname ,files[i]);
		
			
			const stats = fs.stat(filepath,(err,stats) => {
				if(err) throw err;
				if(stats.isFile() && files[i].indexOf('.html') !== -1){
					const htmlfile = files[i];
					const htmlreaded = fs.readFileSync(path.join(pathname,htmlfile));
					const addbuf = Buffer.from(`\n    <link rel="canonical" href="${hrefbox}${htmlfile}">`);
					const ancherindexof = htmlreaded.indexOf(ancherbuf);
					const start = ancherindexof + ancherbuf.length;
					let modifybuf = [];

					const reststream = fs.createReadStream(path.join(pathname,htmlfile),{start});

				
					reststream.on('data',(buf) => {
						modifybuf = Buffer.concat([addbuf,buf]);
						fs.createWriteStream(path.join(pathname,htmlfile),{flags: 'r+',start}).end(modifybuf,() => {
							console.info('success!!');
						});

					});
				}
				if(stats.isDirectory()){
					hrefbox = `${hrefbox}${filepath.split('\\')[filepath.split('\\').length-1]}/`;
					console.info(hrefbox);
					fn(filepath);
				}
			});
		
		}
	});
};
fn(dirpath);