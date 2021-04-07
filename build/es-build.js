const esbuild = require('esbuild');
const copyPublicFolder = require('./copy-public-folder');
module.exports = runBuild;

function runBuild(env) {
  copyPublicFolder(env);

	return esbuild.build({  
		entryPoints: [__dirname + '/../src/app.js'],
  		bundle: true,
  		minify: env === 'production',
  		sourcemap: env !== 'production',
		outfile: 'dist/app.js',
  	}).then(() => {
  		handleBuilt();
  	}, handleError);
}

function handleBuilt() {
	
}

function handleError(error) {
	console.log('Error while building.');
}