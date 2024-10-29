const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GOOGLE_USER_EMAIL,
        pass : process.env.GOOGLE_APP_PASSWORD
    }
})

exports.sendEmail = async (to, subject, text)=>{
    try{
        const mailOptions = {
            from : process.env.GOOGLE_USER_EMAIL,
            to : to,
            subject : subject,
            text : text
        };
        const info = await transporter.sendMail(mailOptions);
        return info.response;
        
    }catch(err){
        console.log(err);
    }
}