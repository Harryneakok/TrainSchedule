$(document).ready(function() {



    // running clock
    function update() {
        $('#clock').html(moment().format('D. MMMM YYYY HH:mm:ss'));
    }

    setInterval(update, 1000);

    var trainName = "";
    var destination = "";
    var firstTime = "";
    var frequency = "";
    var start = "";

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
        start = $(".start").val().trim();
        // revert time one year previous
        firstTime = moment(start, "HH:mm").subtract(1, "years");
        frequency = $(".frequency").val().trim();
        //check if the values were input and saved to variables
        // console.log(trainName);
        //console.log(trainTo);
        //console.log(firstTime);
        //console.log(frequency);
        //console.log(start);
        //create object locally 
        var schedule = {
            train: trainName,
            destination: trainTo,
            trainStart: start,
            every: frequency
        };
        //push object to firebase
        database.ref().push(schedule);
        //empty form fields for next input
        $(".trainName").val("");
        $(".destination").val("");
        $(".start").val("");
        $(".frequency").val("");



    });

    //firebase event to add data to database
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var trainTo = childSnapshot.val().destination;
        var start = childSnapshot.val().trainStart;
        var frequency = parseInt(childSnapshot.val().every);

        var firstTrain = moment(start, "HH:mm").subtract(1, "years");
        // subtract first time from current time
        var difference = moment().diff(moment(firstTrain), "minutes");
        console.log('difference in time is ' + difference);
        // get remainder using modulus
        var remainder = difference % frequency;
        console.log(remainder);
        // time till next train
        var minutesTill = frequency - remainder;
        console.log("minutes till next train " + minutesTill);
        // time of next train
        var nextTrain = moment(moment().add(minutesTill, "minutes"), "HH:mm");
        console.log("next arrival " + moment(nextTrain).format("HH:mm"));

        console.log(trainName);
        console.log(trainTo);
        console.log(start);
        console.log(frequency);



        var rows = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainTo),
            $("<td>").text(start + " Hrs."),
            $("<td>").text(frequency + " Min."),
            $("<td>").text(moment(nextTrain).format("HH:mm") + "Hrs"),
            $("<td>").text(minutesTill + " Min.")
        );
        $("#newTable tbody").append(rows);

    });

});