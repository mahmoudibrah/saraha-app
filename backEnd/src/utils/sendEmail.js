import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.emailSender, // generated ethereal user
      pass:  process.env.passwordSender, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `Saraha Verification ${process.env.EMAILSENDER}`, // sender address
    to: options.email, // list of receivers
    subject: `Saraha Verification ${options.email}`, // Subject line
    text: "Hello world?", // plain text body
    html: options.bodyEmail, // html body
  });
  // console.log("function sendEamil........" , info);
};
