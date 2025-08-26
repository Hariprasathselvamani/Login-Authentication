import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: "587",
  auth: {
    user: "95145e001@smtp-brevo.com",
    pass: "v3TCGRy1JcSnwjrK",
  },
});
export default transporter;
