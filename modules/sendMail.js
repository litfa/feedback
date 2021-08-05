const nodemailer = require("nodemailer")

const sendMail = (to, type, title, content) => {
    let transporter = nodemailer.createTransport({
        host: config.email.host,
        secureConnection: true,
        port: config.email.port,
        // secure: true,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    })

    let mailOptions = {
        from: config.email.from,
        to: to,
        subject: title,
    }
    if (type == "html") {
        mailOptions.html = content
    } else if (type == "text") {
        mailOptions.text = content
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return {
                status: "error",
                err
            }
        } else {
            console.log(info);
            return {
                status: "succeed",
                info
            }
            console.log(`发送成功：`);
        }
    })
}

module.exports = sendMail