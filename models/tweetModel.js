
  module.exports = {
    tweets : tweets = {
        a1: [
          {
            tweet: 'Lorem Ipsum1 ...',
            createdAt: '20 Jan 2019'
          },
          {
            tweet: 'Lorem Ipsum2 ...',
            createdAt: '20 Jan 2019'
          }
        ],
        a2: [
          {
            tweet: 'test by a2...',
            createdAt: '20 Jan 2019'
          },
          {
            tweet: 'test by a21 ...',
            createdAt: '20 Jan 2019'
          }
        ],
    },
    findTweet : function(tweet){
        var results = {};
        for (var key in tweets) {
          var item = [];
          console.log("key 1: " + key);
          console.log("key 2: " + tweets.hasOwnProperty(key));
          console.log("key 3: " + JSON.stringify(tweets[key], null, 4));
          console.log("key 4: " + tweet);
          for(var i = 0; i < tweets[key].length; i++){
            console.log('item 1 ################# : ' + JSON.stringify(item, null, 4))
            let k = 0;
            if (tweets.hasOwnProperty(key) && tweets[key][i].tweet === tweet){
              console.log("key 5: " + tweets[key][i].tweet );
              console.log('item 2 ################# : ' + JSON.stringify(item, null, 4))
              item[k] = tweets[key][i];
              console.log('item  3 ################# : ' + JSON.stringify(item, null, 4))
              k = k + 1
            }
          }
          if(item.length > 0)
            results[key] = item;
        }
        console.log('FIND ################# : ' + JSON.stringify(results, null, 4))
        return results
    },
    find : function(name){
        var results = {};
        console.log('FIND ################# : ' + name)
        console.log('FIND ################# : ' + JSON.stringify(this.tweets[name], null, 4))
        results[name] = this.tweets[name]
        console.log('FIND ################# : ' + JSON.stringify(results, null, 4))
 
        return results
    },
    findOne : function(name,index){
      var results = {};
      var item = [];
      console.log('FIND ################# : ' + name + " > " + index)
      console.log('FIND ################# : ' + JSON.stringify(this.tweets[name], null, 4))
      item[0] = this.tweets[name][index]
      results[name] = item
      console.log('FIND ################# : ' + JSON.stringify(results, null, 4))

      return results
    },
    add : function(name,tweetData){
        var datetime = new Date();
        console.log(datetime);
        var data = { tweet: tweetData ,createdAt: datetime.toISOString().slice(0,10)}
        console.log('ADD ################# : ' + JSON.stringify(data, null, 4))
        console.log('ADD ################# : ' + JSON.stringify(this.tweets[name], null, 4))
        this.tweets[name].push(data)
        console.log('ADD ################# : ' + JSON.stringify(this.tweets[name], null, 4))
        return true
    },
    edit : function(name,index,data){
        console.log('EDIT ################# : ' + name + " > " + index + " > " + data)
        this.tweets[name][index].tweet = data
        return true
    },
    delete : function(name,index){
        console.log('DELETE ################# : ' + name)
        this.tweets[name].splice(index,1)
        return true
    }
}
