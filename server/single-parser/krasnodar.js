const unirest = require('unirest');
const cheerio = require('cheerio');

//* парсер сайта краснодар
function krasnodar() {
    unirest.get('https://93.ru/text/politics/69100654/?from=centercolsecond_old').end(function (response) {
        //! НУЖНА ПЕРЕКОДИРОВКА В UTF8
        const body = response.body; // сохраняем html-код страницы 
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
        console.log(post);
    });
};

krasnodar();