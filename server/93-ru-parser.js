//* парсер для краснодарского новостного сайта потому что кодировка сайта win1251

const iconv = require("iconv-lite");
const https = require("https");
const cheerio = require('cheerio');

https.get('https://93.ru/text/politics/69100654/?from=centercolsecond_old', (res) => {
    res.pipe(iconv.decodeStream("win1251")).collect((err, body) => { // перекодировка из win1251 в utf8
        const $ = cheerio.load(body); // парсим содержимое нашего сайта

        const title = $('.title2').text().trim(); // получаем заголовок новости
        const image = 'https://93.ru' + $('.news-article__image').attr('src'); // получаем ссылку на картинку
        const text = $('.article-text').text(); // получаем текст новости
        const views = $('.block_views_news').text().trim(); // кол-во просмотров

        const post = {
            title: title,
            image: image,
            text: text,
            views: views,
        };
        if (err) throw err;
        console.log(post);
    })
});
