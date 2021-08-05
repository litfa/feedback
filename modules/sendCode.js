const sendMail = require("./sendMail")

const sendCode = (to, user, code) => {
    let content = `
    <h1>留言板</h1>
    <h3>${user} 您的验证码是</h3>
    <h1>${code}</h1>
    <p>打死不要告诉他人.若非本人操作，请忽略此邮件</p>
    <a href="">网站首页</a>
    `

    sendMail(to, "html", "留言板-验证码", content)
}
module.exports = sendCode