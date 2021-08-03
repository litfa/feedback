const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // userName: {
    //     type: String,
    //     required: true,
    //     maxlength:20
    // },
    // 提交名
    // 玩家id	xuid	qq	信誉分	状态	备注
    // name: {
    //     type: String,
    //     // required: true,
    //     // unique:true,
    // },
    // xuid: {
    //     type: String
    // },
    // qq: {
    //     type: Number,
    //     // required: true,
    //     // unique: true,
    // },
    // credit: {
    //     type: Number,
    //     // required: true,
    //     default: 12
    // },
    // status: {
    //     type: String,
    //     // default: ""
    // },
    // remarks: {
    //     type: [Object]
    // },
    // unbanTime: {
    //     type: String
    // }
    userName: {
        type: String,
        required: true,
        maxlength: 20
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        unique: true,
    },
    status: {
        type: Number,
        default: 0
    },
    permission: {
        type: [String],
        default: ["member"]
    }
});
const user = mongoose.model("User", userSchema);

module.exports = user;