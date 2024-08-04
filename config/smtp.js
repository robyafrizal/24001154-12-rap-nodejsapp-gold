const smtp = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USERSMTP,
    pass: process.env.PASS,
  },
};

module.exports = smtp;
