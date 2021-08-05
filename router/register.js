const api_register = require("express")()
const user = require("./../modules/user")
const md5 = require("md5")
const sendCode = require("../modules/sendCode")

api_register.use("/auth", async (req, res) => {
    let { code, email } = req.body
    if (code != req.session.imgCode) {
        res.send({ msg: "验证码有误" })
        return
    }
    let str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!str.test(email)) {
        res.send({ msg: "邮箱格式有误" })
        return
    }
    if (Date.now() - req.session.emailTimeout < 50000) {
        res.send({ msg: "过于频繁" })
        return
    }
    if (req.session.emailTimeout && Date.now() - req.session.emailTimeout > 50000) {
        req.session.emailTimeout = Date.now()
    }
    let emailCode = ""
    // 数组无实际意义，方便控制遍历次数
    for (i in [1, 2, 3, 4, 5]) {
        emailCode += Math.floor(Math.random() * 10)
    }
    req.session.emailCode = emailCode
    sendCode(email, email, emailCode)
    res.send({ status: 200, msg: "请验证邮箱" })
})

api_register.use("/", async (req, res) => {
    let { email, passWord, code, emailCode } = req.body
    let str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!str.test(email)) {
        res.send({ msg: "邮箱格式有误" })
        return
    }
    if (passWord.length <= 3) {
        res.send({ msg: "密码格式有误" })
        return
    }
    if (code != req.session.imgCode) {
        res.send({ msg: "验证码有误" })
        return
    }
    if (emailCode != req.session.emailCode) {
        res.send({ msg: "邮箱验证码有误" })
        return
    }
    let repetition = user.findOne({ email: email })
    if (repetition) {
        res.send({ msg: "该邮箱已被注册" })
        return
    }
    passWord = md5(md5(passWord))

    let add = await user.create({
        email: email,
        password: passWord,
        // 用户名暂时用邮箱 验证后可修改
        userName: email
    })
    console.log(add)
    res.send({ msg: "注册成功" })

})

module.exports = api_register