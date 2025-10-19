const fs = require('fs');
const path = require('path');

const cssFiles = [
  './public/styles/reset.css',
  './public/styles/globals.css',
  './node_modules/@smastrom/react-rating/style.css',
  './node_modules/react-phone-input-2/lib/bootstrap.css',
  './node_modules/swiper/swiper.min.css', 
  './node_modules/react-date-picker/dist/DatePicker.css',
];

const outputFile = 'styles/combined.css';

// Ensure styles/ directory exists
if (!fs.existsSync('styles')) {
  fs.mkdirSync('styles');
}

// Combine all CSS files into one
const combinedCSS = cssFiles
  .map((file) => {
    try {
      return fs.readFileSync(path.resolve(file), 'utf8');
    } catch (e) {
      console.warn(`Warning: Could not read ${file}, skipping...`, e.message);
      return '';
    }
  })
  .join('\n');

fs.writeFileSync(path.resolve(outputFile), combinedCSS, 'utf8');
console.log(`Combined CSS written to ${outputFile}`);