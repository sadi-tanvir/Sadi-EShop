const nodemailer = require("nodemailer")
const SendEmail = (name, email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'programmingcommunity100@gmail.com',
            pass: 'qrcecskabjyjssci'
        }
    });

    const mailOptions = {
        from: 'programmingcommunity100@gmail.com',
        to: email,
        subject: 'Sending Email using node js',
        html: `
        Hi ${name},

        <br/>
        
        You recently requested to reset the password for your [customer portal] account. Click the Link below to proceed.
        
        <br/>
        <br/>
        
        <a style="background-color: '#34d399'; padding: '5px 10px'; color: '#fff'; text-decoration: none " href="${process.env.NEXT_PUBLIC_BASE_URL}/api/user/matchRecoverEmail?token=${token}&email=${email}">Confirm Your Email</a>

        <br/>
        <br/>
        <br/>
        
        If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

};

export default SendEmail