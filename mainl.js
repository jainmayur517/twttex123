var Twitter = require('twitter');
require('dotenv').config();



const MongoClient = require('mongodb').MongoClient;



module.exports=function(res,gh){
const CONSUMER_KEY = 'TWITTER_CONSUMER_KEY';
const CONSUMER_SECRET = 'TWITTER_CONSUMER_SECRET';
const ACCESS_TOKEN_KEY = 'TWITTER_ACCESS_TOKEN_KEY';
const ACCESS_TOKEN_SECRET = 'TWITTER_ACCESS_TOKEN_SECRET';

// Validate Twitter API Keys
const keys = [CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET ]
keys.forEach((key) => {
  if(!process.env[key])
    throw new Error(key + ' has not been set!');
});

var client = new Twitter({
  consumer_key: process.env[CONSUMER_KEY],
  consumer_secret: process.env[CONSUMER_SECRET],
  access_token_key: process.env[ACCESS_TOKEN_KEY],
  access_token_secret: process.env[ACCESS_TOKEN_SECRET],
});

var params = {screen_name: gh, count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  //res.render('web',{users: tweets});
   // console.log((tweets));
    res.send(tweets);

    const uri = "mongodb+srv://twittex123:xxxxx@cluster0-p25ur.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  var ins ={gh,tweets};
  collection.insertOne(ins,function(err,res){
    console.log("data inserted");
  });
  client.close();
});

  }
});
}
