const express = require('express');
const moment = require("moment")
//const requestIp = require("request-ip")
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

//app.use(requestIp.mw([attributeName , 'customIp' ]))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(function(req, res, next){
//     let date = moment().format('MMMM DO YYYY, h:mm:ss a')
//     let ip = req.customIp;
//   //  console.log(date, ip)
//     next()

//     res.send({msg:ip}, {msg:date})
// })

mongoose.connect("mongodb+srv://AartiZare:aartizare@cluster0.l0uzu.mongodb.net/Aarti-Db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


const GlobalMW = function(req, res, next){
    const Time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'')
    const Request = req.originalUrl
    const IP = req.ip
    console.log(Time , Request, IP)
}

app.use(GlobalMW)

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
