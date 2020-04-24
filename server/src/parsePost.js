import unirest from 'unirest';
import cheerio from 'cheerio';

const delay = ms => new Promise(r => setTimeout(r, ms));

//* универсальный парсер
async function parsePost(url, elems) { // функция выполняется ассинхронно
    await unirest.get(url).end(({ body }) => { // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 

        // const body = response.body; // сохраняем html-код страницы 
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
    await delay(3000);
    console.log('kek');
};

module.exports = parsePost; // чтобы была возможность импортировать функйию в другие файлы