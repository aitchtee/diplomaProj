import { parsePost, parseLinks, getPosts } from './parsePost';
import fs from 'fs';
import iconv from 'iconv-lite';

import { elems } from './configs';

const saveResult = json => {
  json = iconv.decode(new Buffer.from(json), 'utf8');
  fs.writeFile('./server/src/result.json', json, err => {
    if (err) console.log('Not saved');
  });
};

const urlPage = 'https://sochi.com/news/';
// const urlPage = 'https://93.ru/text/';

parseLinks(urlPage, '.block-news-content h3 a', 50)
// parseLinks(urlPage, '.LBcb a')
  .then(links => {
    getPosts(links, elems.sochi).then(posts => saveResult(JSON.stringify(posts, 0, 4)))
  })
  .catch(e => console.log(e));

