const fs = require('fs');
const path = require('path');
const config = require('./src/config/defaultConfig');

const dirpath = path.join(config.root,'./testHTML');

fs.readdir(dirpath,(err,files) => {
	if(err) throw err;
	for(let i=0;i<files.length;i++){
		const filepath = dirpath +'\\'+files[i];
		const stats = fs.stat(filepath,(err,stats) => {
			if(err) throw err;
			if(stats.isFile() && files[i].indexOf('.html')){
				const htmlfile = files[i];
				let htmlreadstream = fs.readFileSync(dirpath+'\\'+htmlfile);
				console.log(htmlreadstream.toString())
			}
		});
		
	}
});
// console.log(files);