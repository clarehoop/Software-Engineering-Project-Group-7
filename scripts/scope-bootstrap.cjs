const postcss = require('postcss');
const prefixer = require('postcss-prefix-selector');
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.css');
const outputPath = path.resolve(__dirname, '../src/styles/bootstrap-scoped.css');

const css = fs.readFileSync(inputPath, 'utf8');

postcss([
  prefixer({
    prefix: '.bootstrap-scope',
    exclude: [/^:root/, /^html/, /^body/],
  }),
])
  .process(css, { from: inputPath, to: outputPath })
  .then((result) => {
    fs.writeFileSync(outputPath, result.css);
    console.log('✅ bootstrap-scoped.css generated successfully!');
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });
