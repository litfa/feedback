window.onload = () => {
    app = new Vue({
        el: "#app",
        data: {
            loginType: "useUserNameAndPassWord",
            email: "",
            passWord: "",
            code: "",
            imgCodeUrl: "http://127.0.0.1:3000/api/user/code"
        },
        methods: {
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