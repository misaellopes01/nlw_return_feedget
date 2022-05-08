import nodemailer from 'nodemailer'
import { MailProvider, SendMailData } from "../MailProvider";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a2917aadd1170f",
      pass: "acce3c24bdae50"
    }
  });

export class NodemailerMailProvider implements MailProvider{
    async sendMail ({ body, subject }: SendMailData){
        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Misael Lopes <mecl.ely@gmail.com>',
            subject,
            html: body
        })
    };

}