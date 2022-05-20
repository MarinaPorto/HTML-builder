const fs = require('fs');
const path = require('path');


const newFolderPath = path.resolve(__dirname, 'files-copy');
const folderPath = path.resolve(__dirname, 'files');
console.log(folderPath);

fs.promises.mkdir(newFolderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

async function copyFiles (folderPath) {
  const files = await fs.promises.readdir(folderPath);
  for (const file of files) {
    fs.promises.copyFile(folderPath+'\\'+file, newFolderPath+'\\'+file);
  }
}
  
copyFiles(folderPath);
  