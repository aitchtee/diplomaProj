"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unirest = _interopRequireDefault(require("unirest"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var delay = function delay(ms) {
  return new Promise(function (r) {
    return setTimeout(r, ms);
  });
}; //* универсальный парсер


function parsePost(_x, _x2) {
  return _parsePost.apply(this, arguments);
}

function _parsePost() {
  _parsePost = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url, elems) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _unirest.default.get(url).end(function (_ref) {
              var body = _ref.body;

              // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 
              // const body = response.body; // сохраняем html-код страницы 
              var $ = _cheerio.default.load(body); // парсим содержимое нашего сайта


              var domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 

              var title = $(elems.title).text().trim(); // получаем заголовок новости

              var image = $(elems.image).attr('src'); // получаем ссылку на картинку

              image = image.indexOf('http') >= 0 ? image : "http://".concat(domain).concat(image);
              var text = $(elems.text).text().trim(); // получаем текст новости

              var views = $(elems.views).text().trim(); // кол-во просмотров

              var post = {
                title: title,
                image: image,
                text: text,
                views: views
              };
              console.log(post);
            });

          case 2:
            _context.next = 4;
            return delay(3000);

          case 4:
            console.log('kek');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parsePost.apply(this, arguments);
}

;
module.exports = parsePost; // чтобы была возможность импортировать функйию в другие файлы