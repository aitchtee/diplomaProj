import { parseLinks, getPosts } from './parsePost';
import fs from 'fs';
import iconv from 'iconv-lite';

import { elems, urls } from './config/configs';

const saveResult = json => {
  json = iconv.decode(new Buffer.from(json), 'utf8');
  fs.writeFile('./server/src/result.json', json, err => {
    if (err) console.log('Not saved');
  });
};

parseLinks(urls.krd, '.card') //* krasnodar
  .then(links => {
    getPosts(links, elems.krasnodar)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  }).catch(e => console.log(e));

parseLinks(urls.sch, '.block-news-content h3 a') //* sochi
  .then(links => {
    getPosts(links, elems.sochi)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  }).catch(e => console.log(e));

parseLinks(urls.nvr, '.post-info a') //* novorossiysk
  .then(links => {
    getPosts(links, elems.novorossiysk)
      .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  }).catch(e => console.log(e));

// parse every hour
setInterval(() => {

  parseLinks(urls.krd, '.card') // krasnodar
    .then(links => {
      getPosts(links, elems.krasnodar)
        .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
    }).catch(e => console.log(e));

  parseLinks(urls.sch, '.block-news-content h3 a') // sochi
    .then(links => {
      getPosts(links, elems.sochi)
        .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
    }).catch(e => console.log(e));

  parseLinks(urls.nvr, '.post-info a') // novorossiysk
    .then(links => {
      getPosts(links, elems.novorossiysk)
        .then(posts => saveResult(JSON.stringify(posts, 0, 4)))
    }).catch(e => console.log(e));
}, 3600000)