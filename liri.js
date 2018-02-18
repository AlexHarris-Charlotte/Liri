const env = require("dotenv").config();
const keys = require("./keys"); 
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Liri Commands
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

const operation = process.argv[2];
const nameInput = process.argv[3];



function tweets() {
    client.get("statuses/home_timeline", function(error, tweets, response) {
        if(error) throw error;
        for(var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].user.name + ": ", tweets[i].text);
        }
    })
}

function spotifyCall(nameInput){
    console.log(process.argv);
    spotify.search({ type: 'track', query: nameInput, limit: '1' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
      console.log("Album Name: " + data.tracks.items[0].album.name);
      console.log("URL link to the album on Spotify: " + data.tracks.items[0].external_urls.spotify);
      });
}

function movieFinder(nameInput) {
    let queryUrl = "https://www.omdbapi.com/?t=" + nameInput + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("The movie's Name is: " + JSON.parse(body).Title);
            console.log("The movie's release Year is: " + JSON.parse(body).Year);
            console.log("The movie's IMDB Rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("The movie's is scripted in: " + JSON.parse(body).Language);
            console.log("The movie's plot: " + JSON.parse(body).Plot);
            console.log("Some of the Actors involved: " + JSON.parse(body).Actors);
        }
    })
};

// Using == because we don't have to worry about data type. process.argv only returns strings
if(operation == "my-tweets") {
    tweets();
} else if(operation == "spotify-this-song" && nameInput != undefined) {
    spotifyCall(nameInput);
} else if(operation == "movie-this" && nameInput != undefined) {
    movieFinder(nameInput); 
} else if(operation == "do-what-it-says") {
    // Some Function here
} else {
    console.log("Invalid parameters passed when initiating application!");
}


