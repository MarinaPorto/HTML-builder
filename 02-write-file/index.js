const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'), { 'flag': 'a' });
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Привет! Введите текст');

readline.on('line', (text) => {
  if (text === 'exit') {
    console.log('Всего хорошего!'); 
    process.exit(0);
  }
  writeStream.write(text);
}).on('close', () => {
  console.log('Всего хорошего!');
  process.exit(0);
});










