const env = require("dotenv").config();
const keys = require("./keys"); 
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");
const inquirer = require('inquirer');

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

// * `do-what-it-says`


(function askUser(){ inquirer.prompt([
        {
            type: "list",
            name: "userOption",
            message: "What option do you wish to select?",
            choices: ["Movie", "Song", "Tweets"],
        }

    ]).then(answers => {
        const userMediaChoice = answers.userOption;
        if (answers.userOption === "Movie") {
            userMediaInput(userMediaChoice);
        } else if (answers.userOption === "Song"){
            userMediaInput(userMediaChoice);
        } else if (answers.userOption === "Tweets") {
            tweets();
        }
    });
})();


function userMediaInput (media) {
    inquirer.prompt([
        {
            type: "input",
            name: "mediaChoice",
            message: `What ${media} do you wish to search for?`
        }
    ]).then(answers => {
        if (media === "Movie") {
            movieFinder(answers.mediaChoice);
        } else if (media === "Song") {
            spotifyCall(answers.mediaChoice);
        }
    })
}



function tweets() {
    client.get("statuses/home_timeline", function(error, tweets, response) {
        if(error) throw error;
        for(var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].user.name + ": ", tweets[i].text);
        }
    })
}



function spotifyCall(nameInput){
    spotify.search({ type: 'track', query: nameInput}, function(err, data) {
        if (err) {
          return console.log('PURPLE PICKELED PEPPERS Error occurred: ' + err);
        }
        for(var i = 0; i < 10; i++) {
            console.log(i);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Artist Name: " + data.tracks.items[i].album.artists[i].name);
            console.log("Album Name: " + data.tracks.items[i].album.name);
            console.log("URL link to the album on Spotify: " + data.tracks.items[i].external_urls.spotify); 
        }
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



