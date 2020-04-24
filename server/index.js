/* добавить в package.josn для babel:
   "scripts": {
    "babel": "babel \file or directory name/ -d dist"
},
*/

import parsePost from './parsePost';
import { elems } from './configs';

parsePost(
    'https://sochi.com/news/2085/461261/',
    elems.sochi
);
