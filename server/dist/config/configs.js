"use strict";

//* объект, в котором хранятся параметры для поиска 
var elems = {
  krasnodar: {
    tag: '.material__tag',
    title: '.material__name',
    image: '.figure a img',
    text: '.material__content_detail_text'
  },
  sochi: {
    tag: 'ul li',
    title: '.h4-gorod',
    image: '.detail_picture img',
    text: '.detail_text'
  },
  novorossiysk: {
    // tag: '.news-detail__category',
    // title: '.news-detail__header h1',
    // image: '.news-detail-content img',
    // text: '.decor p',
    tag: '.td-category',
    title: '.entry-title',
    image: '.td-post-content img',
    text: '.td-post-content'
  }
}; // делаем возможным передать объект в другие файлы

module.exports = {
  elems: elems // передаем объект elems с конфигурациями для поиска

};