// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCjF7TTzNP_HeL6W7BA_B4xzDNkQUCQzAQ",
    authDomain: "train-scheduler-cf7b2.firebaseapp.com",
    databaseURL: "https://train-scheduler-cf7b2.firebaseio.com",
    projectId: "train-scheduler-cf7b2",
    storageBucket: "train-scheduler-cf7b2.appspot.com",
    messagingSenderId: "403553121260",
    appId: "1:403553121260:web:84a9baf7294fff87"
};

firebase.initializeApp(firebaseConfig);
var dataBase = firebase.database();
//Initial values
var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

//Retrieve the value of the user input
$("#add-train-schedule").on("click", function (event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

//Push to the database
    dataBase().ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});