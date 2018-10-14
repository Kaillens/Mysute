const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var db = mongoose.connect("mongodb://Kaillens:wafwafmiaou-2@ds223009.mlab.com:23009/arnaudscieur", function( err, response){
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

const modele = mongoose.model('article', article);
let ArticleList = modele.find({$or: [{'Article.site': 'DragOnSlide'}, {'Article.site': 'Planète Chocolat'}]}, {}).sort({'Article.Date': -1})
.then((Article) => {
    console.log(Article);
});
    
;



app.listen(8012, ()=>{
    console.log('waf waf 8012 waf waf');
})