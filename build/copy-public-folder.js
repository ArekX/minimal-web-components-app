const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

module.exports = function(env) {
    const distFolder = path.join(rootDir, '/dist');

    if (env === 'production' && fs.lstatSync(distFolder).isDirectory()) {
        fs.rmdirSync(distFolder, { recursive: true });
    }

    copyFolderRecursive(path.join(rootDir, '/public'), distFolder, true);
};

function copyFolderRecursive(source, target, first = false) {
    const targetFolder = first ? target : path.join(target, path.basename(source));

    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        for(const file of files) {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursive(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        }
    }

    function copyFileSync(source, target) {

        let targetFile = target;

        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }

        fs.copyFileSync(source, targetFile);
    }
}