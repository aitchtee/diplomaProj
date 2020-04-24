const unirest = require('unirest');
const cheerio = require('cheerio');

//* универсальный парсер
function parsePost(url, elems) {
    unirest.get(url).end(function (response) {

        const body = response.body; // сохраняем html-код страницы 
        const $ = cheerio.load(body); // парсим содержимое нашего сайта

        const domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 
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

module.exports = parsePost; // чтобы была возможность импортировать функйию в другие файлы