const fs = require('fs');
const path = require('path');
const filesPath = path.resolve(__dirname, 'secret-folder');

async function readDir (filesPath) {
  const files = await fs.promises.readdir(filesPath, {withFileTypes: true});
  for (const file of files) {
    if (file.isFile()) {
      console.log(file.name  + ' - ' + path.extname(file.name) + ' - ' + fs.statSync(filesPath + '\\'+ file.name).size + 'kb');
    }
  }
}

readDir(filesPath);
