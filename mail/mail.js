import mailConfig from '../user.config';
import nodemailer from 'nodemailer';

const config = mailConfig.mail; 

const transporter = nodemailer.createTransport({
    service: config.service,
    //host: 'smtp.gmail.com',
    //port: 465,
    //secure: true,
    //scope : "https://mail.google.com/",
    scope : "https://www.googleapis.com/auth/gmail.send",
    auth: {
        type: 'OAuth2',
        ...(config.auth),
        //expires: 1484314697598
    }
});

transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
    let accessToken = userTokens[user];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
    }
});

export const validateMail = mail => {
    if (!mail || typeof mail !== 'string' || mail.length < 1) {
        return false;
    }
    return mail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim
    );
};

export const validateMessage = message => {
    if (!message || typeof message !== 'string' || message.length < 1) {
        return false;
    }
    return true;
};

export const sendMail = (from, name ,subject, message) => {
    if (!validateMail(from)) {
        throw Error('Почта имеет неверный формат.');
    }
    if (!validateMessage(message)) {
        throw Error('Сообщение не должно быть пустым.');
    }
    message = message.replace(/[\\/]gi/, '');
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: `${name} <${from}>`,
                to: 'igorkili@mail.ru',
                subject,
                text: message
            },
            (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info)
                }
            }
        );
    });
};

export default transporter;
