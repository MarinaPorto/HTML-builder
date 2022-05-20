const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'), { 'flag': 'a' });
const folderPath = path.resolve(__dirname, 'styles');

async function copyFiles (folderPath) {
  const files = await fs.promises.readdir(folderPath, {withFileTypes: true});
  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const readStream = fs.createReadStream(path.resolve(folderPath + '\\' + file.name), 'utf-8'); 
      readStream.on('data', (chunk) => {
        writeStream.write(chunk); 
      });
    } 
  } 
}
copyFiles(folderPath);

