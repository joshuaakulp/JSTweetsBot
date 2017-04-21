
// Dependencies =================================
var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);


// RETWEET BOT ==================================

// find latest tweet according to the query 'q' in params
var retweet = function() {
  var params = {
    q: '#javascript, #JavaScript', //#javascripttweets, #JavaScriptTweets', // REQUIRED
    result_type: 'recent',
    lang: 'en'
  }
  // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

  Twitter.get('search/tweets', params, function(err, data) {
    // if there are no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
        // Tell TWITTER to retweet
        Twitter.post('statuses/retweet/:id', {
          id: retweetId
        }, function(err, response){
          if (response) {
            console.log('Retweeted!!!');
          }
          if (err) {
            console.log('Something went wrong while RETWEETING... Duplication maybe...');
          }
        });
    }
    // if unable to search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}

// grab and retweet as soon as program is running
retweet();
// retweet every 60 minutes
setInterval(retweet, 3600000);
