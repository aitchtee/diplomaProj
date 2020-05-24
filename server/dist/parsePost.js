"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _unirest = _interopRequireDefault(require("unirest"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _axios = _interopRequireDefault(require("axios"));

var log = function log(i, count, ms) {
  return new Promise(function (r) {
    return setTimeout(function () {
      console.log("\n  \u0418\u043D\u0434\u0435\u043A\u0441: ".concat(i, ";\n  \u0412\u0441\u0435\u0433\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439: ").concat(count, ";\n  "));
      r();
    }, ms);
  });
};

var dbUrl = 'http://localhost:8080/posts'; //* универсальный парсер

function parsePost(url, elems) {
  // функция выполняется ассинхронно
  return new Promise(function (resolve, reject) {
    _unirest.default.get(url).end(function (_ref) {
      var body = _ref.body,
          error = _ref.error;
      // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 
      if (error) reject(error);

      var $ = _cheerio.default.load(body); // парсим содержимое нашего сайта


      var domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 

      var tag = $(elems.tag).text().trim(); // получаем категорию

      var title = $(elems.title).text().trim(); // получаем заголовок новости

      var image = $(elems.image).attr('src'); // получаем ссылку на картинку

      image = image.indexOf('http') >= 0 ? image : "http://".concat(domain).concat(image);
      var text = $(elems.text).text().trim(); // получаем текст новости

      var city = function city() {
        switch (domain) {
          case "kubnews.ru":
            return 'krd';

          case "sochi.com":
            return 'sch';

          default:
            return "don't know";
        }
      };

      console.log(city());
      var post = {
        source: domain,
        city: city(),
        tag: tag,
        title: title,
        image: image,
        text: text
      }; //* add post into db

      _axios.default.post("".concat(dbUrl), post).then(function () {
        console.log('post added');
      });

      resolve(post);
    });
  });
}

; //* получаем все ссылки на новости

function parseLinks(url, className) {
  var maxLinks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  return new Promise(function (resolve, reject) {
    var links = [];

    _unirest.default.get(url).end(function (_ref2) {
      var body = _ref2.body,
          error = _ref2.error;
      // но ожидает выполнение этой команды //*вытаскиваем сразу свойство body из response 
      if (error) reject(error);

      var $ = _cheerio.default.load(body); // парсим содержимое нашего сайта


      var domain = url.match(/\/\/(.*?)\//)[1]; // получаем домен сайта 

      $(className).each(function (i, e) {
        if (i + 1 <= maxLinks) //! чтобы получить все ссылки убрать эту строчку
          links.push((domain.indexOf('http') ? 'http://' + domain : '') + $(e).attr('href')); // чтобы не получать больше чем maxLinks ссылок
      });
      resolve(links);
      if (!links.length) reject({
        error: 'empty'
      }); // если ссылок нет
    });
  });
}

;

function getPosts(_x, _x2) {
  return _getPosts.apply(this, arguments);
}

function _getPosts() {
  _getPosts = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(links, elems) {
    var posts, count, i, post;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 
            posts = [];
            count = links.length;
            i = 0;

          case 3:
            if (!(i < count)) {
              _context.next = 13;
              break;
            }

            _context.next = 6;
            return parsePost(links[i], elems).then(function (post) {
              return post;
            });

          case 6:
            post = _context.sent;
            posts.push(post);
            _context.next = 10;
            return log(i + 1, count, 100);

          case 10:
            i++;
            _context.next = 3;
            break;

          case 13:
            ;
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              if (!posts.length) reject({
                empty: 'empty'
              });
              resolve(posts);
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPosts.apply(this, arguments);
}

; // чтобы была возможность импортировать функцию в другие файлы