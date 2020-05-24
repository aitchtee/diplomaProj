"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _parsePost = require("./parsePost");

var _fs = _interopRequireDefault(require("fs"));

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _configs = require("./config/configs");

var saveResult = function saveResult(json) {
  json = _iconvLite.default.decode(new Buffer.from(json), 'utf8');

  _fs.default.writeFile('./server/src/result.json', json, function (err) {
    if (err) console.log('Not saved');
  });
};

var urlPageKrd = 'https://kubnews.ru/'; //* krasnodar

var urlPageSch = 'https://sochi.com/news/'; //* sochi
// const urlPage = 'https://ofnvrsk.ru/'; //* novorossiysk
// const urlPage = 'https://novorossportal.ru/category/news/'; //* novorossiysk
// parseLinks(urlPageKrd, '.card') //* krasnodar
//   // parseLinks(urlPage, '.td-main-content .td-image-wrap', 10) //* novorossiysk
//   .then(links => {
//     getPosts(links, elems.krasnodar)
//       .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//   })
//   .catch(e => console.log(e));

(0, _parsePost.parseLinks)(urlPageSch, '.block-news-content h3 a') //* sochi
.then(function (links) {
  (0, _parsePost.getPosts)(links, _configs.elems.sochi).then(function (posts) {
    return saveResult(JSON.stringify(posts, 0, 4));
  });
}).catch(function (e) {
  return console.log(e);
});