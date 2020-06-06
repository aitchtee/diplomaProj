"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var app = express();

var paginate = require('jw-paginate');

var db = require('./config/db');

var port = 8080;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var ObjectID = require('mongodb').ObjectID; //* Import Model


var Post = require("./models/postModel"); //* Connect to MongoDB


mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, function () {
  return console.log("MongoDB is connected");
}); //* Enable CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); //* Get all of our posts

app.get('/posts', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var totalItem, page, limit, pager, pageOfItems;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Post.countDocuments().exec();

          case 2:
            totalItem = _context.sent;
            page = parseInt(req.query.page) || 1;
            limit = 8;
            pager = paginate(totalItem, page, limit);
            _context.next = 8;
            return Post.find().sort({
              $natural: -1
            }).limit(limit).skip(pager.startIndex);

          case 8:
            pageOfItems = _context.sent;
            return _context.abrupt("return", res.json({
              pager: pager,
              pageOfItems: pageOfItems
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //* Get all posts from one city

app.get("/posts/:city", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var city, totalItem, page, limit, pager, pageOfItems;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            city = req.params.city;
            _context2.next = 3;
            return Post.find({
              city: city
            }).countDocuments().exec();

          case 3:
            totalItem = _context2.sent;
            page = parseInt(req.query.page) || 1;
            limit = 8;
            pager = paginate(totalItem, page, limit);
            _context2.next = 9;
            return Post.find({
              city: city
            }).sort({
              $natural: -1
            }).limit(limit).skip(pager.startIndex);

          case 9:
            pageOfItems = _context2.sent;
            return _context2.abrupt("return", res.json({
              pager: pager,
              pageOfItems: pageOfItems
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //* Get all posts of one city's tag

app.get("/posts/:city/:tag", /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var city, tag, totalItem, page, limit, pager, pageOfItems;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            city = req.params.city;
            tag = req.params.tag;
            _context3.next = 4;
            return Post.find({
              city: city,
              tag: tag
            }).countDocuments().exec();

          case 4:
            totalItem = _context3.sent;
            page = parseInt(req.query.page) || 1;
            limit = 8;
            pager = paginate(totalItem, page, limit);
            _context3.next = 10;
            return Post.find({
              city: city,
              tag: tag
            }).sort({
              $natural: -1
            }).limit(limit).skip(pager.startIndex);

          case 10:
            pageOfItems = _context3.sent;
            return _context3.abrupt("return", res.json({
              pager: pager,
              pageOfItems: pageOfItems
            }));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //* Get One of Our posts

app.get("/posts/:city/:tag/:id", function (req, res) {
  var id = req.params.id;
  var city = req.params.city;
  Post.findOne({
    _id: new ObjectID(id),
    city: city
  }).then(function (post) {
    res.json(post);
  });
}); //* Create or Update post

app.post("/posts", function (req, res) {
  var data = {
    source: req.body.source,
    city: req.body.city,
    tag: req.body.tag,
    title: req.body.title,
    image: req.body.image,
    text: req.body.text
  };
  Post.findOne({
    text: req.body.text
  }, function (err, post) {
    if (post) {
      Post.findByIdAndUpdate(req.body.id, data, {
        upsert: false
      }).then(function (updated) {
        res.json(updated);
      });
    } else {
      Post.create(data).then(function (created) {
        res.json(created);
      });
    }
  });
}); //* Delete selected post

app.post("/posts/:id", function (req, res) {
  Post.findByIdAndDelete(req.params.id).then(function (post) {
    res.json({
      message: "Your post was deleted!"
    });
  });
});
app.listen(port, function () {
  return console.log("Server is running on port " + port);
});