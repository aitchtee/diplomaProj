const unirest = require('unirest');
const cheerio = require('cheerio');

//* парсер сайта сочи
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

sochi();