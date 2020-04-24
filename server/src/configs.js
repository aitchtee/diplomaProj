//* объект, в котором хранятся параметры для поиска 
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

// делаем возможным передать объект в другие файлы
module.exports = {
    elems: elems, // передаем объект elems с конфигурациями для поиска
};
