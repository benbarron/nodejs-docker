import { injectable } from 'inversify';
import nodemailer from 'nodemailer';
import config from 'config';
import { EmailException } from '../exceptions/email-exception';
import Mail from 'nodemailer/lib/mailer';
import edge from 'edge.js';

@injectable()
export class NotificationService {
    public async SendEmail(email: string, subject: string, template: string, data: any = {}) {
        try {
            const html = edge.render(template, data);

            const transporter: Mail = nodemailer.createTransport({
                service: config.get('email.service'),
                auth: {
                    user: config.get('email.user'),
                    pass: config.get('email.password')
                }
            });

            await transporter.sendMail({
                from: config.get('email.user'),
                to: email,
                subject,
                html
            });
        } catch (error) {
            console.log(error);
            throw new EmailException(501, 'There was an error sending the email');
        }
    }

    public async SendTextMessage() {}
}
