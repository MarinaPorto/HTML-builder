const fs = require('fs');
const path = require('path');
const reg = /{{2}[a-z]+}{2}/g;
let textTemplate = '';
const newFolderPath = path.resolve(__dirname, 'project-dist');
const htmlWriteStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'), { 'flag': 'a' });

fs.promises.mkdir(newFolderPath, { recursive: true }, (err) => {
  if (err) throw err;
});

const readStream = fs.createReadStream(path.resolve(__dirname, 'template.html'), 'utf-8'); 

async function getData () {
  readStream.on('data', (chunk) => {
    textTemplate += chunk;
    let matches = textTemplate.match(reg);
    matches.forEach((el, index) => {
      let newReadStream = fs.createReadStream(path.resolve(__dirname, 'components', el.substring(2, el.length - 2) + '.html'), 'utf-8');
      let newtextTemplate = '';
      newReadStream.on('data', (chunk) => {
        textTemplate = textTemplate.replace(el, chunk);
        newtextTemplate = textTemplate;
        if (index == matches.length-1) {
          htmlWriteStream.write(newtextTemplate);
        }
      });
    });
  });
}
 
getData();


const writeStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'), { 'flag': 'a' });
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

const newFolderAssetsPath = path.resolve(__dirname,'project-dist', 'assets');
const folderAssetsPath = path.resolve(__dirname, 'assets');

async function copyDir(folderAssetsPath, newFolderAssetsPath) {
  const entries = await fs.promises.readdir(folderAssetsPath,{withFileTypes:true});
  await fs.promises.mkdir(newFolderAssetsPath, { recursive: true }, (err) => {
    if (err) throw err;
  });
  for(let entry of entries) {
    const srcPath = path.join(folderAssetsPath, entry.name);
    const destPath = path.join(newFolderAssetsPath, entry.name);
    if(entry.isDirectory()) {
      await copyDir(srcPath,destPath);
    } else {
      await fs.promises.copyFile(srcPath,destPath);
    }
  }
}

copyDir(folderAssetsPath, newFolderAssetsPath);