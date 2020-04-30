import unirest from 'unirest';
import cheerio from 'cheerio';


const log = (i, count, ms) => {
  return new Promise(r => setTimeout(() => {
    console.log(`
  Индекс: ${i};
  Всего записей: ${count};
  `);
    r();
  }, ms));
};

//* универсальный парсер
function parsePost(url, elems) { // функция выполняется ассинхронно
  return new Promise((resolve, reject) => {
    unirest.get(url).end(({ body, error }) => { // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 

      if (error) reject(error);

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
      resolve(post);
      // console.log(post);
    });
  });
};

//* получаем все ссылки на новости
function parseLinks(url, className, maxLinks = 5) {
  // '.block-news-content h3 a' - sochi
  // '.LBcb a'
  return new Promise((resolve, reject) => {
    let links = [];

    unirest.get(url).end(({ body, error }) => { // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 
      if (error) reject(error);

      const $ = cheerio.load(body); // парсим содержимое нашего сайта
      const domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 

      $(className).each((i, e) => {
        if (i + 1 <= maxLinks) //! чтобы получить все ссылки убрать эту строчку
          links.push('https://' + domain + $(e).attr('href')); // чтобы не получать больше чем maxLinks ссылок
      });

      resolve(links)
      if (!links.length) reject({ error: 'empty' }); // если ссылок нет
    });
  });
};

async function getPosts(links, elems) { // 
  let posts = [];
  let count = links.length;
  // console.log(links);
  for (let i = 0; i < count; i++) {
    const post = await parsePost(
      links[i],
      elems,
    ).then(post => post);
    posts.push(post);
    await log(i + 1, count, 2000);
  };

  return new Promise((resolve, reject) => {
    if (!posts.length) reject({ empty: 'empty' });
    resolve(posts);
  });
};

export {
  parsePost,
  parseLinks,
  getPosts
}; // чтобы была возможность импортировать функцию в другие файлы