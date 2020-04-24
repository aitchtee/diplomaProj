const iconv = require("iconv-lite");
const https = require("https");
const cheerio = require('cheerio');
// const fs = require('fs');

//* перекодирована в UTF8
https.get('https://93.ru/text/world/69109678/?from=centercolsecond_old', (res) => {
    res.pipe(iconv.decodeStream("win1251")).collect((err, body) => {
        if (err) throw err;
        // console.log(body);

        const $ = cheerio.load(body); // парсим содержимое нашего сайта

        const title = $('.title2').text().trim(); // получаем заголовок новости
        const image = 'http://93.ru' + $('.news-article__image').attr('src'); // получаем ссылку на картинку
        const text = $('.article-text p').text(); // получаем текст новости
        const views = $('.block_views_news').text().trim(); // кол-во просмотров

        const post = {
            title: title,
            image: image,
            text: text,
            views: views,
        };

        console.log(post);

        // let json = JSON.stringify(post); // преобразование объекта post в JSON.
        // fs.writeFileSync('../src/post.json', json); // запись в файл
    })
});
