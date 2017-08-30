// var express = require('express');
// var path = require("path")
// const generatePassword = require("password-generate")
//
// const app = express()
//
// app.use(express.static(path.join(__dirname, "/client/build")))
//
// app.get("/api/passwords", (req, res) => {
//     const count = 5
//
//     const passwords = Array.from(Array(count).keys()).map(i => generatePassword(12, false))
//
//     res.json(passwords)
//
//     console.log("Sent ${count} passwords")
// })
//
// app.get('*', (req, res) => {
//     res.sendFile(path.join (__dirname + "/client/build/index.html"))
// })
//
// const port = process.env.PORT || 5000
// app.listen(port)
//
// console.log("Password generator listening on ${port}")
//
// // var router = express.Router();
//
//
//
// // /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });
//
// module.exports = router;
