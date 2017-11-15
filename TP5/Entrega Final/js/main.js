var cb = new Codebird;
cb.setConsumerKey("sVddRoKKRlYuERcYSbLsLur1v", "WuF6tPy1ZQejWMkR79AzGKof0f8xgolp6IJYi99veHzGZ7d5Sj");

/*cb.__call(
  "search_tweets",
  "q=Twitter",
  function (reply, rate_limit_status) {
    console.log(reply); 
    console.log(rate_limit_status);
  },
  true // this parameter required
);*/

cb.__call(
  "search_tweets",
  {"q": "Argentina"},
  null, // no callback needed, we have the promise
  true // app-only auth

).then(function (data) {
      var reply = data.reply,
          rate = data.rate;
      console.log(reply);
      console.log(rate);
  },
  function (err) {
      alert("error");
  });
