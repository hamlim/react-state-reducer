'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('./createStore.js');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createStore).default;
  }
});

var _component = require('./component.js');

Object.defineProperty(exports, 'CreateStore', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_component).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }