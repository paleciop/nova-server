
class Warning extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "Warning";
    this.statusCode = statusCode
  }
}

module.exports = {
  //yourLife() {},
  Warning
};