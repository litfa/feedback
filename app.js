const express = require("express")
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

// post解析
var bodyParser = require('body-parser')//用于req.body获取值的
app.use(bodyParser.json())
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/public", express.static('./public'))
app.use("/login", express.static('./public/login'))
// app.use("/login", express.static('./public'))

// 登录api
app.use("/api/login", require("./router/api_add"))

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