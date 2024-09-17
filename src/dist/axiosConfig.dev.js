"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Buat instance Axios
var axiosInstance = _axios["default"].create({
  baseURL: 'http://localhost:2999' // URL base pointing to your backend

}); // Tambahkan interceptor untuk menyisipkan token JWT pada setiap request


axiosInstance.interceptors.request.use(function (config) {
  var token = localStorage.getItem('token'); // Ambil token dari localStorage

  if (token) {
    config.headers['Authorization'] = "Bearer ".concat(token); // Tambahkan token ke header Authorization

    config.headers['Cache-Control'] = 'no-cache'; // Nonaktifkan cache
  }

  return config;
}, function (error) {
  return Promise.reject(error);
}, function (error) {
  if (error.response) {
    console.error('Error status:', error.response.status);
    console.error('Error data:', error.response.data);
  } else {
    console.error('Error message:', error.message);
  }

  return Promise.reject(error);
});
var _default = axiosInstance;
exports["default"] = _default;