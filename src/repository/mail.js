//------------------------Node_Mailer-----------------------------
// const nodemailer = require("nodemailer");
// const smtp = require("../../config/smtp");

// class MailRepository {
//   async sendMail(mail) {
//     const transporter = nodemailer.createTransport(smtp);
//     const sendEmail = await transporter.sendMail(mail, function (err, info) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     return sendEmail;
//   }
// }
// module.exports = MailRepository;
