"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _parsePost = require("./parsePost");

var _fs = _interopRequireDefault(require("fs"));

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _configs = require("./configs");

var saveResult = function saveResult(json) {
  json = _iconvLite.default.decode(new Buffer.from(json), 'utf8');

  _fs.default.writeFile('./server/src/result.json', json, function (err) {
    if (err) console.log('Not saved');
  });
};

var urlPage = 'https://sochi.com/news/'; // const urlPage = 'https://93.ru/text/';

(0, _parsePost.parseLinks)(urlPage, '.block-news-content h3 a', 50) // parseLinks(urlPage, '.LBcb a')
.then(function (links) {
  (0, _parsePost.getPosts)(links, _configs.elems.sochi).then(function (posts) {
    return saveResult(JSON.stringify(posts, 0, 4));
  });
}).catch(function (e) {
  return console.log(e);
}); // parsePost(
//   'https://kubantoday.ru/navstrechu-75-letiyu-velikoy-pobedy/',
//   elems.krasnodar
// );