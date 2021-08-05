const express = require("express")
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

global.config = {}
config.email = {}
require("./config")

require("./modules/connect")

// post解析
var bodyParser = require('body-parser')//用于req.body获取值的
app.use(bodyParser.json())
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());

app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    // 1天过期
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 1 }
}));

app.use("/", express.static('./public'))
// 登录
app.use("/login", express.static('./public/login'))
// 注册
app.use("/register", express.static('./public/register'))
// 找回密码
app.use("/resetPassword", express.static('./public/resetPassword'))

// 图片验证码
app.use("/api/user", require("./router/imgCode"))
// 登录api
app.use("/api/login", require("./router/login"))
// 注册api
app.use("/api/register", require("./router/register"))

// 需要登录的操作
app.use("/api/user", (req, res, next) => {
    if (req.session.isLogin == "user" || req.session.isLogin == "admin") {
        next()
    } else {
        res.send({ status: 201, msg: "未登录" })
    }
})
app.use("/api/user", require("./router/api_add"))
app.use("/api/user", require("./router/api_del"))
app.use("/api/user", require("./router/api_edit"))
app.use("/api/user", require("./router/api_query"))

app.listen(3000, () => {

})