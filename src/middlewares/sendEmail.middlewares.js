import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { SEND_MAIL_ID, SEND_MAIL_PASSWORD, SEND_SERVICES } = process.env;

const { email_service, user, pass } = process.env;
// 트랜스포터 라는 것을 이용해서 이메일을 보낼 것이다.
const transporter = nodemailer.createTransport({
    service: email_service,
    auth: {
        user: user,
        pass: pass,
    },
});

export const sendVerificationEmail = (email, token) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: SEND_MAIL_ID,
            to: email,
            subject: "이메일 인증",
            text: `아래의 인증 코드를 입력하여 이메일 인증을 완료해주세요: ${token}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};
