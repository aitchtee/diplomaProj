const unirest = require('unirest');
const cheerio = require('cheerio');

const elems = {
    krasnodar: {
        title: '.title2',
        image: '.news-article__image',
        text: '.article-text',
        views: '.block_views_news',
    },
    sochi: {
        title: '.h4-gorod',
        image: '.detail_picture img',
        text: '.detail_text',
        views: '.count',
    },
    novorossiysk: {
        title: '.news-detail__header h1',
        image: '.news-detail-content img',
        text: '.decor p',
    },
};

// парсер сайта краснодар
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

// парсер сайта сочи
function sochi() {
    unirest.get('https://sochi.com/news/2090/461193/').end(function (response) {
        const body = response.body; // сохраняем html-код страницы 
        const $ = cheerio.load(body); // парсим содержимое нашего сайта

        // начинаем работу с спарсенными данными
        const title = $('.h4-gorod').text(); // получаем заголовок новости
        const image = 'https://sochi.com' + $('.detail_picture img').attr('src'); // получаем ссылку на картинку
        const text = $('.detail_text').text().trim(); // получаем текст новости
        const views = $('.count').text().trim(); // кол-во просмотров

        const post = {
            title: title,
            image: image,
            text: text,
            views: views,
        };

        console.log(post);
    });
};

// парсер сайта новороссийск
function novorossiysk() {
    //! ToDo Нет просмотров
    unirest.get('https://ofnvrsk.ru/news/item/5114').end(function (response) {
        const body = response.body; // сохраняем html-код страницы
        const $ = cheerio.load(body);

        const title = $('.news-detail__header h1').text();
        const image = $('.news-detail-content img').attr('src');
        const text = $('.decor p').text().trim();
        // const views;

        const post = {
            title: title,
            image: image,
            text: text,
            // views: views,
        };

        console.log(post);
    });
};

function parsePost(url, elems) {
    unirest.get(url).end(function (response) {

        const body = response.body; // сохраняем html-код страницы 
        const $ = cheerio.load(body); // парсим содержимое нашего сайта

        const domain = url.match(/\/\/(.*?)\//)[1];
        const title = $(elems.title).text().trim(); // получаем заголовок новости
        let image = $(elems.image).attr('src'); // получаем ссылку на картинку
        image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
        const text = $(elems.text).text().trim(); // получаем текст новости
        const views = $(elems.views).text().trim(); // кол-во просмотров

        const post = {
            title: title,
            image: image,
            text: text,
            views: views,
        };
        console.log(post);
    });
};

parsePost(
    'https://ofnvrsk.ru/news/item/5114',
    elems.novorossiysk
)