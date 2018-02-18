require("dotenv").config();
require("./keys"); //?
const Twitter = require('twitter');
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



const myRevealingMovieModule = (function() {
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
})(nameInput);


function tweets() {
    let queryUrl = "https://api.twitter.com/1.1/search/tweets.json?q=akharri8"
}



// Using == because we don't have to worry about data type. process.argv only returns strings
if(operation == "my-tweets") {
    // Some Function here
} else if(operation == "spotify-this-song" && nameInput != undefined) {
    // Some Function here
} else if(operation == "movie-this" && nameInput != undefined) {
    myRevealingMovieModule; 
} else if(operation == "do-what-it-says") {
    // Some Function here
} else {
    console.log("Invalid parameters passed when initiating application!");
}


