const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const Mail = require('nodemailer/lib/mailer');
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const {
    GMAIL_API_SENDER_EMAIL,
    GMAIL_API_CLIENT_ID,
    GMAIL_API_CLIENT_SECRET,
    GMAIL_API_REFRESH_TOKEN
} = process.env;

const Mailing = {}

const oauth2Client = new OAuth2(
    GMAIL_API_CLIENT_ID,
    GMAIL_API_CLIENT_SECRET,
    OAUTH_PLAYGROUND
);



Mailing.sendEmail = (email, type) => {
    oauth2Client.setCredentials({
        refresh_token: GMAIL_API_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: GMAIL_API_SENDER_EMAIL,
            clientId: GMAIL_API_CLIENT_ID,
            clientSecret: GMAIL_API_CLIENT_SECRET,
            refreshToken: GMAIL_API_REFRESH_TOKEN,
            accessToken
        },
    });

    let mailOptions;
    mailOptions = {
        from: GMAIL_API_SENDER_EMAIL,
        to: email,
        subject: "RajiaTnG: Sign up Verification code",
        text: "Hello najish,\nYour verification code is 1234.",
        html: "<p>Hello najish,</p><br/><p>Your verification code is 1234.</p>",
    }
    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })


}

module.exports = Mailing;