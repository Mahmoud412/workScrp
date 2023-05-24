const nodemailer = require("nodemailer");
const credentialsData = require("./credentials.json");
const messageData = require("./message.json");
const emailsData = require("./emails.json");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: credentialsData[0].email, // first email in credentials.json
    pass: credentialsData[0].password, // password for first email
  },
});

const sendMessages = async () => {
  let emailIndex = 0;
  for (let i = 0; i < credentialsData.length; i++) {
    const { email, password } = credentialsData[i];
    transporter.set("auth", { user: email, pass: password });

    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 5; k++) {
        const messageIndex = j * 5 + k;
        const { subject, text } = messageData[messageIndex];
        const recipient = emailsData[emailIndex];
        const mailOptions = {
          from: email,
          to: recipient,
          subject,
          text,
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email sent from ${email} to ${recipient}`);
        emailIndex = (emailIndex + 1) % emailsData.length;
      }
    }
  }
};

sendMessages();
