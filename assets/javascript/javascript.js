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
var dataRef = firebase.database();
//Initial values
var name = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

//Retrieve the values of the user input
$("#add-train-schedule").on("click", function (event) {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    //Push to the database
    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

dataRef.ref().on("child_added", function (childSnapshot) {

    var firstTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var trainRemainder = diffTime % trainFrequency;
    var minutesAway = trainFrequency - trainRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrival).format("hh:mm")
 
    $("#current-train-schedule").append("<tr><td class='train-name'>" +
        childSnapshot.val().name +
        " </td><td class='train-destination'> " + childSnapshot.val().destination +
        " </td><td  class='first-train-frequency'> " + trainFrequency +
        " </td><td  class='train-time'> " + nextArrival +
        "</td><td>" + minutesAway + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
