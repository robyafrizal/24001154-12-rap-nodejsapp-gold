const logger = (req, res, next) => {
  console.log(`Req: ${req.method} - ${req.hostname} ${req.url}`);
  next(); //lanjut ke middleware selanjutnya
};

module.exports = logger;
