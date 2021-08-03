const api_add = require("express")()

api_add.use("/add", (req, res) => {
    res.send("add")
})

module.exports = api_add