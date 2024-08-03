// ------------------------Node_Mailer-----------------------------
const nodemailer = require("nodemailer");
const smtp = require("../../config/smtp");

class MailRepository {
  constructor() {}
  async sendEmail(mail) {
    const transporter = nodemailer.createTransport(smtp);
    const send = await transporter.sendMail(mail, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return send;
  }
}
module.exports = MailRepository;
