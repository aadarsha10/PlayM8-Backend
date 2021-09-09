const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    service: "Gmail",
    auth: {
        user: 'm.playm08@gmail.com', // email address user
        pass: 'm8@Play1234', // email password
    },
}); // initiating email sender variable

function mailer(mail_to) {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // send mail with defined transport object
    let confirmMail = transporter.sendMail({
        from: '"Play M8👻" <m.playm08@gmail.com>', // sender address
        to: mail_to, // list of receivers
        subject: "Registration Successful! ✔", // Subject line
        text: "Hello Organizer", // plain text body
        html: "<b>Registered Successfully</b><br><b>Welcome to the PlayM8 family</b> Now you can procced to login", // html body
    });
    console.log("Message sent: %s", confirmMail.messageId);
}

module.exports = mailer;
