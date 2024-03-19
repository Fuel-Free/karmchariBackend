const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  }
});

exports.sendMail = function(To, Subject, Text) {
  const mailOptions = {
    from: 'spinfotech@gmail.com',
    to: To,
    subject:Subject,
    text : Text,
  };

  return transporter.sendMail(mailOptions);
};
