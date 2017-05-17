import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";
// var Twitter = require("twitter");

// TODO: Now we have only one stream overall,
// we should have one per user at least
let stream = null;

// This is a in memory only collection
export const Tweets = new Mongo.Collection("tweets");

export const Geo = new Mongo.Collection("geos");

// Twitter streamer should run only on the server
if (Meteor.isServer) {
  Meteor.publish("tweets", function tweetsPublication() {
    return Tweets.find({}, {sort: {created_at: -1}, limit:10});
    //    return Tweets.find({}, {sort: {created_at: -1}, limit:10});

  });

  Meteor.publish("geos", function geoPublication() {
    return Geo.find({}, {sort: {created_at: -1}, limit:10});
  });

  // This method will trigger the streamer
  Meteor.methods({
    "twitter.stream"(query) {
      
      console.log("Twitter search" + query);

      // Create the Twitter object
      let client = new Twitter({
        consumer_key: "R5F6FHrmp06Tkb81zn7lonS14",
        consumer_secret: "UXMAtlro8KHTNnms8kbp3JtmFEo6NebujC1Dr6kNhnFbyW3HUc",
        access_token_key: "337434398-rBkL7N2dbe3qIUhVgVBR9j66Ors0ebDm6Hw6nV2d",
        access_token_secret: "5hS5snkKOuMGSJ3H5VyjXxc4tVMHUf4xmrJ7U9XX6szSg"
      });


      if (stream) {
        console.log("Stopping previous stream");
        stream.destroy();
        // Remove all the tweets
        Tweets.remove({});
      }

      // Colombia
      let locations = "-79.12,-4.23,-66.85,12.59";
      stream = client.stream("statuses/filter", {track: query, locations:locations});
      stream.on("data", Meteor.bindEnvironment(function(tweet) {
        // console.log(tweet.text);
        // resolve(tweet);

        if(tweet.coordinates)
        {
          console.log( tweet.coordinates);
          Tweets.insert(tweet);

        // Geo.insert(tweet.coordinates)




        }
      }));

      stream.on("error", function(error) {
        console.log(error);
        throw Meteor.Error(error);
      });
    }// twitter.stream
  }); //Meteor.methods
}
