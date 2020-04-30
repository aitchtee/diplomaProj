"use strict";

//* объект, в котором хранятся параметры для поиска 
var elems = {
  krasnodar: {
    title: '.E1wd',
    image: '.EHr3',
    text: '.KFatj',
    views: '.KJbx .KJep' // title: '.heading_news-detail',
    // image: '.news-detail__photo img',
    // text: '.KFatj',
    // views: '.card-short-info.card-short-info__views',

  },
  sochi: {
    title: '.h4-gorod',
    image: '.detail_picture img',
    text: '.detail_text',
    views: '.count'
  },
  novorossiysk: {
    title: '.news-detail__header h1',
    image: '.news-detail-content img',
    text: '.decor p'
  }
}; // делаем возможным передать объект в другие файлы

module.exports = {
  elems: elems // передаем объект elems с конфигурациями для поиска

};