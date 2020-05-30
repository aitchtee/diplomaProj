//* объект, в котором хранятся параметры для поиска 
const elems = {
  krasnodar: {
    tag: '.material__tag',
    title: '.material__name',
    image: '.figure a img',
    text: '.material__content_detail_text',
  },
  sochi: {
    tag:'.nav-pills li:nth-child(5)',
    title: '.h4-gorod',
    image: '.detail_picture img',
    text: '.detail_text',
  },
  novorossiysk: {
    tag: '.post-categories',
    title: '.post-header h1',
    image: '.featured-caption img',
    text: '.post-content p',
  },
};

// делаем возможным передать объект в другие файлы
module.exports = {
  elems: elems, // передаем объект elems с конфигурациями для поиска
};
