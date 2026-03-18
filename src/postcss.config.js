module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '.bootstrap-scope',
      exclude: [/^:root/, /^html/, /^body/],
    }),
  ],
};