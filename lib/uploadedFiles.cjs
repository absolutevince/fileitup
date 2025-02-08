const fs = require("fs");
const path = require("path");

class UploadedFiles {
  static #files = [];
  static addFile(file) {}
  static getFile(filename) {}
  static getAllFiles(cb) {}
  static getFileFromStorage(filename) {}
}

module.exports = UploadedFiles;
