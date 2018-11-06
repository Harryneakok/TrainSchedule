$(document).ready(function() {

    var trainName = "";
    var destination = "";
    var firstTime = "";
    var frequency = "";

    var config = {
        apiKey: "AIzaSyCCHIzqOi8osyp6IV5IpNkr9Akalx-ms6Y",
        authDomain: "train-74450.firebaseapp.com",
        databaseURL: "https://train-74450.firebaseio.com",
        projectId: "train-74450",
        storageBucket: "",
        messagingSenderId: "77864705795"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $(".btn").on("click", function(e) {
        // prevent default behavior for submit button
        event.preventDefault();

        // set user inputs as variables
        trainName = $(".trainName").val().trim();
        trainTo = $(".destination").val().trim();
        firstTime = moment($(".firstTime").val().trim(), "HH:mm").format("X");
        frequency = $(".frequency").val().trim();
        //check if the values were input and saved to variables
        console.log(trainName);
        console.log(trainTo);
        console.log(firstTime);
        console.log(frequency);
        //create object locally 
        var schedule = {
            train: trainName,
            destination: trainTo,
            trainStart: firstTime,
            every: frequency
        };
        //push object to firebase
        database.ref().push(schedule);
        //empty form fields for next input
        $(".trainName").val("");
        $(".destination").val("");
        $(".firstTime").val("");
        $(".frequency").val("");

    });

    //firebase event to add data to database
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var trainTo = childSnapshot.val().destination;
        var firstTime = childSnapshot.val().trainStart;
        var frequency = childSnapshot.val().every;

        console.log(trainName);
        console.log(trainTo);
        console.log(firstTime);
        console.log(frequency);

        var rows = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainTo),
            $("<td>").text(firstTime),
            $("<td>").text(frequency)
        );
        $("#newTable tbody").append(rows);

    });

});