const fs = require('fs');
const path = require('path');
const config = require('./src/config/defaultConfig');

const dirpath = path.relative(config.root,config.modifyabpath);
const fn = function(pathname){
	fs.readdir(pathname,(err,files) => {
		if(err) throw err;
		const ancherbuf = Buffer.from(config.ancherhtml);
		for(let i=0;i<files.length;i++){
			const filepath = path.join(pathname ,files[i]);
		
			const stats = fs.stat(filepath,(err,stats) => {
				if(err) throw err;
				if(stats.isFile() && files[i].indexOf('.html') !== -1){
					const htmlfile = files[i];
					const htmlreaded = fs.readFileSync(path.join(pathname,htmlfile));
					const hrefbox = filepath.replace(dirpath,'').replace(/\\/g,'/');
					const addbuf = Buffer.from(`\n    <link rel="canonical" href="${config.modifyhostname}${hrefbox}">`);
					const ancherindexof = htmlreaded.indexOf(ancherbuf);
					const start = ancherindexof + ancherbuf.length;
					const reststream = fs.createReadStream(path.join(pathname,htmlfile),{start});
				
					reststream.on('data',(restbuf) => {
						const modifybuf = Buffer.concat([addbuf,restbuf]);
						fs.createWriteStream(path.join(pathname,htmlfile),{flags: 'r+',start}).end(modifybuf,() => {
							console.info(`${filepath} modified successfully!!`);
						});
					});
				}
				if(stats.isDirectory()){
					fn(filepath);
				}
			});
		}
	});
};
fn(dirpath);