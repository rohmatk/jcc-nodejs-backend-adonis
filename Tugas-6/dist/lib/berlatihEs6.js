"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterData = exports.data = exports.checkScore = exports.convert = exports.sapa = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sapa = function sapa(nama) {
  return "Halo Selamat Pagi, ".concat(nama);
}; //object literals


exports.sapa = sapa;

var convert = function convert(nama, domisili, umur) {
  var output = {
    nama: nama,
    domisili: domisili,
    umur: umur
  };
  return output;
};

exports.convert = convert;

var checkScore = function checkScore(param) {
  var output = {};
  var arr = param.split(/,/);

  for (var i = 0; i < arr.length; i++) {
    var _arr$i$split = arr[i].split(':'),
        _arr$i$split2 = _slicedToArray(_arr$i$split, 2),
        key = _arr$i$split2[0],
        value = _arr$i$split2[1];

    output[[key]] = value;
  }

  return output;
};

exports.checkScore = checkScore;
var data = [{
  name: "Ahmad",
  "class": "adonis"
}, {
  name: "Regi",
  "class": "laravel"
}, {
  name: "Bondra",
  "class": "adonis"
}, {
  name: "Iqbal",
  "class": "vuejs"
}, {
  name: "Putri",
  "class": "Laravel"
}];
exports.data = data;

var filterData = function filterData(param) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.filter(function (data) {
    return data["class"] === param;
  });
};

exports.filterData = filterData;