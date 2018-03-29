import mailConfig from '../user.config';
import nodemailer from 'nodemailer';
import request from 'request';

const config = mailConfig.mail; 
const recaptcha = mailConfig.recaptcha;

const transporter = nodemailer.createTransport({
    service: config.service,
    //host: 'smtp.gmail.com',
    //port: 465,
    //secure: true,
    scope : "https://mail.google.com/",
    //scope : "https://www.googleapis.com/auth/gmail.send",
    auth: {
        type: 'OAuth2',
        ...config.auth,
        //expires: 1484314697598
    }
});
transporter.on('token', token => {
    console.log('A new access token was generated');
    console.log('User: %s', token.user);
    console.log('Access Token: %s', token.accessToken);
    console.log('Expires: %s', new Date(token.expires));
});
//transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
//    let accessToken = userTokens[user];
//    if(!accessToken){
//        return callback(new Error('Unknown user'));
//    }else{
//        return callback(null, accessToken);
//    }
//});

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

const validateCaptcha = async (req) => {
    const {response} = req.body;
    if (!response || response.length == 0) {
        return false
    }
    const verificationUR = recaptcha.url + `?secret=${recaptcha.secret}&response=${response}&remoteip=${req.connection.remoteAddress}`
    console.log(verificationUR);
    let result = false;
    request (verificationUR, (err, response, body) => {
        if(body.success !== undefined && !body.success){
            console.log('Failed captcha verification');
            result = false ;
            return result;
        }
        console.log('success');
        result = true ;
        return result;
    })
    return result;
};

export const sendMail = (from, name ,subject, message, req) => {
    return new Promise((resolve, reject) => {
        if (!validateMail(from)) {
            reject(new Error('Почта имеет неверный формат.'));
        }
        if (!validateMessage(message)) {
            reject(new Error('Сообщение не должно быть пустым.'));
        }
        if (!validateCaptcha(req)){
            reject(new Error('Проверка не пройдена.'));
        }
        message = message.replace(/[\\/]gi/, '');

        transporter.sendMail(
            {
                from: `${name} <${from}>`,
                to: 'igorkili@mail.ru',
                subject,
                text: message,
                //auth: config.auth
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
