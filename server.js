const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var db = mongoose.connect("mongodb://localhost:27017/test", function( err, response){
if(err){console.log(err);}
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req,res,next){
    res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    res.setHeader( 'Access-Control-Expose-Headers', 'Content-Length,Content-Range');
next();
});


const article = new mongoose.Schema({
    "titre": String,
    "url": String,
    "site": String,
    "miniature": String,
    "description": String,
    "Date": String,
    "tags": [String]
})

const modele = mongoose.model('Mesarticle', article);
app.get("/GetArticle", async function (req,res,){
    let Origin = parseInt(req.query.Number);
    let ArticleList = await modele.find({}, {'_id':0}).sort({'Date': -1});
    res.json(ArticleList.slice(Origin,Origin+2));
})
app.post("/sendmail",function (req, res){
    Envoi = req.body;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
        auth: {
          user: "ArnaudScieurPro@gmail.com",
          pass: "wafmiaou-2"
        }
      });
      // Voir doc nodemailer, c'est pour créer un mail qui n'en est pas un chez eux.

      var mailOptions = {
        from: Envoi.email,
        to: "ArnaudScieurPro@gmail.com",
        subject: "Message de " + Envoi.name + " :" + Envoi.Object,
        text: "Contact :" + Envoi.email + "\n" + Envoi.message
      };
      // DOnnée du mail

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

    res.end(JSON.stringify('Votre a message a été envoyé'));
})


app.listen(process.env.PORT ||8012, ()=>{
    console.log('waf waf 8012 waf waf');
})