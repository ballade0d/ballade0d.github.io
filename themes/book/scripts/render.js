/* global hexo */

"use strict";

var ejs = require("ejs");
const { home } = require("hexo/dist/plugins/helper/is");

var menu_file, home_file;

// before_post_render

hexo.extend.filter.register("before_post_render", function (data) {
  // preprocess markdown file
  data.content = data.content.replace(
    /```mermaid([\s\S]*?)```/g,
    function (match, code) {
      return `<div class="mermaid">${code}</div>`;
    }
  );
  return data;
});

// after_post_render

hexo.extend.filter.register("after_post_render", function (data) {
  // checkbox in list
  let checkbox_pattern =
    /<li>([\s]*)<input type="checkbox" id="(\w*)"(>| checked="true">| checked>)/g;
  let checkbox_replacement =
    '<li class="checkbox-item">$1<input type="checkbox" id="$2"$3';
  data.content = data.content.replace(checkbox_pattern, checkbox_replacement);
  return data;
});

// before_generate

// generator

hexo.extend.generator.register("home", function (locals) {
  var menu_path = hexo.theme.config.menu_page;
  var home_path = hexo.theme.config.home_page;

  locals.pages.forEach(function (page) {
    if (page.source === menu_path) {
      menu_file = page;
    }
    if (page.source === home_path) {
      home_file = page;
    }
  });

  return {
    path: "index.html",
    data: home_file,
    layout: ["index"],
  };
});

// after_generate

hexo.extend.filter.register("after_generate", function () {
  hexo.route.remove(home_file.path);
  hexo.route.remove(menu_file.path);
});

// renderer

hexo.extend.renderer.register(
  "ejs",
  "html",
  function (data, options) {
    options.filename = data.path;
    options.menu = menu_file ? menu_file.content : "";
    return ejs.render(data.text, options);
  },
  true
);
