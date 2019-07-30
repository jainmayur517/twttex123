var exp= require('express');
var app =exp();
var mainl= require('./mainl.js');

var bodyParser =require('body-parser');
var request=require('request');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/",function(req,res){
    
    res.render('fp');
    
    });


    app.get('/results',function(req,res){
            var gh=req.query.bm;
            var users=mainl(res,gh);
    });

    app.listen(process.env.PORT,process.env.IP);




  //  app.listen(3000,function(){
  //console.log("server started!");
  //})