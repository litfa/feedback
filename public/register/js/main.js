// const { default: axios } = require("axios")

window.onload = () => {
    app = new Vue({
        el: "#app",
        data: {
            email: "",
            emailCode: "",
            passWord: "",
            code: "",
            imgCodeUrl: `${config.api.url}/api/user/code`,
            emailErrColor: "",
            passwordErrColor: "",
            codeErrColor: "",
            emailCodeTexe: "获取",
            emailCodeTexeDisabled: false
        },
        created() {
            this.$watch("email", function (newValue, oldValue) {
                // console.log(newValue);
                // console.log(this.passwordErrColor);
                let str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!str.test(this.email)) {
                    this.emailErrColor = "red 1px solid"
                } else {
                    this.emailErrColor = ""
                }
            })
            this.$watch("passWord", function (newValue, oldValue) {
                // console.log(newValue);
                // console.log(this.passwordErrColor);
                // 密码至少包含 数字和英文，长度6-20
                let str = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                if (!str.test(this.passWord)) {
                    this.passwordErrColor = "red 1px solid"
                } else {
                    this.passwordErrColor = ""
                }
            })
        },
        methods: {
            nextImgCode: function () {
                this.imgCodeUrl = `${config.api.url}/api/user/code?id=${Math.random()}`
            },
            getEmailCode: function () {
                this.emailCodeTexeDisabled = true

                let str = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if (!str.test(this.email)) {
                    this.emailErrColor = "red 1px solid"
                    this.emailCodeTexe = "邮箱格式有误"
                    setTimeout(() => {
                        this.emailCodeTexe = "重新获取"
                        this.emailCodeTexeDisabled = false
                    }, 2000)
                    return
                }
                let str2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
                if (!str2.test(this.passWord)) {
                    this.passwordErrColor = "red 1px solid"
                    this.emailCodeTexe = "密码格式有误"
                    setTimeout(() => {
                        this.emailCodeTexe = "重新获取"
                        this.emailCodeTexeDisabled = false
                    }, 2000)
                    return
                }
                if (this.code.length != 4) {
                    this.codeErrColor = "red 1px solid"
                    this.emailCodeTexe = "验证码有误"
                    setTimeout(() => {
                        this.emailCodeTexe = "重新获取"
                        this.emailCodeTexeDisabled = false
                    }, 2000)
                    return
                }

                var that = this
                let j = 60
                for (let i = 0; i < 60; i++) {
                    setTimeout(() => {
                        console.log(i * 60);
                        that.emailCodeTexe = j
                        j--
                        if (j < 1) {
                            that.emailCodeTexe = "重新获取"
                            this.emailCodeTexeDisabled = false
                        }
                    }, i * 1000);
                }
                if (this.code.length < 4) {
                    return
                }
                var that = this
                axios.post(`${config.api.url}/api/register/auth`, {
                    code: that.code,
                    email: that.email
                })
            },
            login: function () {
                let that = this
                axios.post(`${config.api.url}/api/register`, {
                    email: that.email,
                    emailCode: that.emailCode,
                    passWord: that.passWord,
                    code: that.code
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    })
}