import { parsePost, parseLinks, getPosts } from './parsePost';
import fs from 'fs';
import iconv from 'iconv-lite';

import { elems } from './config/configs';

const saveResult = json => {
  json = iconv.decode(new Buffer.from(json), 'utf8');
  fs.writeFile('./server/src/result.json', json, err => {
    if (err) console.log('Not saved');
  });
};

const urlPageKrd = 'https://kubnews.ru/all/?type=news'; //* krasnodar
const urlPageSch = 'https://sochi.com/news/'; //* sochi
const urlPageNvr = 'https://novorab.ru/news/'; //* novorossiysk

parseLinks(urlPageKrd, '.card') //* krasnodar
  .then(links => {
    getPosts(links, elems.krasnodar)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  })
  .catch(e => console.log(e));

parseLinks(urlPageSch, '.block-news-content h3 a') //* sochi
  .then(links => {
    getPosts(links, elems.sochi)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  })
  .catch(e => console.log(e));

parseLinks(urlPageNvr, '.post-info a') //* novorossiysk
  .then(links => {
    getPosts(links, elems.novorossiysk)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  })
  .catch(e => console.log(e));

// setInterval(() => {
//   parseLinks(urlPageKrd, '.card') // krasnodar
//     .then(links => {
//       getPosts(links, elems.krasnodar)
//         .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
//     })
//     .catch(e => console.log(e));
// }, 3600000)