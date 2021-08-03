window.onload = () => {
    app = new Vue({
        el: "#app",
        data: {
            loginType: "useUserNameAndPassWord",
            userName: "",
            passWord: "",
            code: ""
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
                axios.post(`${config.api.url}/login`, {
                    type: that.loginType,
                    userName: that.userName,
                    password: that.password,
                    code: that.code
                })
            }
        }
    })
}