window.onload = () => {
    app = new Vue({
        el: "#app",
        data: {
            loginType: "useUserNameAndPassWord",
            email: "",
            passWord: "",
            code: "",
            imgCodeUrl: `${config.api.url}/api/user/code`
        },
        methods: {
            nextImgCode: function () {
                this.imgCodeUrl = `${config.api.url}/api/user/code?id=${Math.random()}`
            },
            useUserNameAndPassWord: function () {
                this.loginType = "useUserNameAndPassWord"
                this.userName = ""
                this.passWord = ""
                this.code = ""
            },
            useEmailAndCode: function () {
                this.loginType = "useEmailAndCode"
                this.userName = ""
                this.passWord = ""
                this.code = ""
            },
            login: function () {
                let that = this
                axios.post(`${config.api.url}/api/login`, {
                    type: that.loginType,
                    email: that.email,
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