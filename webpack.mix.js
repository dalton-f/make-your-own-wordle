/* eslint-disable no-undef */
const mix = require("laravel-mix");

mix.webpackConfig({
  watchOptions: {
    ignored: /node_modules|dist|mix-manifest.json/,
  },
});

mix
  .js("src/js/app.js", "static/js")
  .postCss("src/css/app.pcss", "static/css", [require("@tailwindcss/postcss")]);

mix.disableNotifications();
