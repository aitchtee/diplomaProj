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
}; // const urlPageKrd = 'https://kubnews.ru/all/?type=news'; //* krasnodar
// const urlPageSch = 'https://sochi.com/news/'; //* sochi
// const urlPageNvr = 'https://novorab.ru/news/'; //* novorossiysk
// parseLinks(urls.krd, '.card') //* krasnodar
//   .then(links => {
//     getPosts(links, elems.krasnodar)
//       .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//   }).catch(e => console.log(e));


(0, _parsePost.parseLinks)(_configs.urls.sch, '.block-news-content h3 a') //* sochi
.then(function (links) {
  (0, _parsePost.getPosts)(links, _configs.elems.sochi).then(function (posts) {
    return saveResult(JSON.stringify(posts, 0, 4));
  });
}).catch(function (e) {
  return console.log(e);
}); // parseLinks(urls.nvr, '.post-info a') //* novorossiysk
//   .then(links => {
//     getPosts(links, elems.novorossiysk)
//       .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//   }).catch(e => console.log(e));
// parse every hour
// setInterval(() => {
//   parseLinks(urlPageKrd, '.card') // krasnodar
//     .then(links => {
//       getPosts(links, elems.krasnodar)
//         .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//     }).catch(e => console.log(e));
//   parseLinks(urlPageSch, '.block-news-content h3 a') // sochi
//     .then(links => {
//       getPosts(links, elems.sochi)
//         .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//     }).catch(e => console.log(e));
//   parseLinks(urlPageNvr, '.post-info a') // novorossiysk
//     .then(links => {
//       getPosts(links, elems.novorossiysk)
//         .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//     }).catch(e => console.log(e));
// }, 3600000)