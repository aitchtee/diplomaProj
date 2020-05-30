import unirest from 'unirest';
import cheerio from 'cheerio';
import axios from 'axios';

const log = (i, count, ms) => {
  return new Promise(r => setTimeout(() => {
    console.log(`
  Индекс: ${i};
  Всего записей: ${count};
  `);
    r();
  }, ms));
};

const dbUrl = 'http://localhost:8080/posts';

//* универсальный парсер
function parsePost(url, elems) { // функция выполняется ассинхронно
  return new Promise((resolve, reject) => {
    unirest.get(url).end(({ body, error }) => { // но ожидает завершения выполнения этой команды //* получаем сразу свойство body из response 
      if (error) reject(error);

      const $ = cheerio.load(body); // парсим содержимое нашего сайта
      const domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 
      let tag = $(elems.tag).text().trim(); // получаем категорию
      const title = $(elems.title).text().trim(); // получаем заголовок новости
      let image = $(elems.image).attr('src'); // получаем ссылку на картинку

      image = image.indexOf('http') >= 0 ? image : `http://${domain}${image}`;
      const text = $(elems.text).text().trim(); // получаем текст новости

      const city = () => {
        switch (domain) {
          case "kubnews.ru":
            return 'krd';
          case "sochi.com":
            return 'sch';
          case "novorab.ru":
            return 'nvr';
          default:
            return "another"
        }
      }

      if (city() === "sch") {
        switch (tag) {
          case "Общество: люди, государство, жизнь":
            tag = "Общество"
            break;
          case "Новости медицины":
            tag = "Здравоохранение"
            break;
          case "Новости происшествия":
            tag = "Происшествия"
            break;
          default:
            return tag
        }
      }

      const post = {
        source: domain,
        city: city(),
        tag: tag,
        title: title,
        image: image,
        text: text,
      };

      axios.post(`${dbUrl}`, post).then(() => { //* add post into db
        console.log('post saved');
      }).catch(e => console.log(e))

      resolve(post);
    });
  });
};

//* получаем все ссылки на новости
function parseLinks(url, className, maxLinks = 5) {
  return new Promise((resolve, reject) => {
    let links = [];

    unirest.get(url).end(({ body, error }) => { // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 
      if (error) reject(error);

      const $ = cheerio.load(body); // парсим содержимое нашего сайта
      const domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 

      $(className).each((i, e) => {
        if (i < maxLinks)
          links.push(($(e).attr('href').indexOf('http') ? ('http://' + domain) : '') + $(e).attr('href')); // чтобы не получать больше чем maxLinks ссылок
      });

      resolve(links)
      if (!links.length) reject({ error: 'empty' }); // если ссылок нет
    });
  });
};

//* получаем данные из новостей
async function getPosts(links, elems) { // 
  let posts = [];
  let count = links.length;
  for (let i = 0; i < count; i++) {
    const post = await parsePost( // ожидаем выполнение этой функции
      links[i],
      elems,
    ).then(post => post).catch(e => console.log(e));
    posts.push(post);
    await log(i + 1, count, 100);
  };

  return new Promise((resolve, reject) => {
    if (!posts.length) reject({ empty: 'empty' });
    resolve(posts);
  });
};

export {
  parsePost,
  parseLinks,
  getPosts,
}; // чтобы была возможность импортировать функцию в другие файлы