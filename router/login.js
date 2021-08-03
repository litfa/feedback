const api_login = require("express")()
const user = require("./../modules/user")
// const svgCaptcha = require('svg-captcha');


api_login.use("/", async (req, res) => {
    let { type, email, passWord, code } = req.body
    // 账号密码登录
    console.log(req.body);
    // res.end()
    console.log(type);
    if (type == "useUserNameAndPassWord") {
        if (code != req.session.imgCode) {
            req.session.imgCode = undefined
            res.send({ msg: "验证码错误" })
            return
        }
        if (email.length <= 3 || password.length <= 4) {
            res.send({ msg: "账号或密码错误" })
            return
        }
        let userInfo = await user.findOne({ userName })
        if (userInfo && userInfo.password == password) {
            req.session.isLogin = true
            req.session.permission = userInfo.permission
            req.session.userName = userInfo.userName
            res.send({ status: 200, msg: "登录成功" })
        } else {
            res.send({ status: 201, msg: "账号或密码错误" })
        }

    }
})

module.exports = api_login