// Initialize Firebase
var config = {
    apiKey: "AIzaSyCoaAt0Jn4yqdSxGteMyKqituTnX0VPAfs",
    authDomain: "train-scheduler-304d3.firebaseapp.com",
    databaseURL: "https://train-scheduler-304d3.firebaseio.com",
    projectId: "train-scheduler-304d3",
    storageBucket: "train-scheduler-304d3.appspot.com",
    messagingSenderId: "307828762676"
};
firebase.initializeApp(config);
database = firebase.database();

$(function() {
    $('button[type=submit]').on('click', function(event) {
        event.preventDefault();
        database.ref().push({
            name: $("#form-name").val().trim(),
            destination: $("#form-destination").val().trim(),
            time: $("#form-time").val().trim(),
            frequency: $("#form-frequency").val().trim()
        })
        $("#form-*").val('');

    })
    database.ref().on("child_added", function(snapshot) {
        let newTrain = snapshot.val();
        let tr = $('<tr>');
        let td = $('<td>');


        var tFrequency = newTrain.frequency;

        // Time is 3:30 AM
        var firstTime = newTrain.time;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var trainTime = moment(newTrain.time).format("YYYY, MM, DD");





        // let nextTrain = parseInt(newTrain.frequency) * trainMonths;


        tr.append(td.clone().text(newTrain.name));
        tr.append(td.clone().text(newTrain.destination));
        tr.append(td.clone().text(newTrain.time));
        tr.append(td.clone().text(trainMonths));
        tr.append(td.clone().text(newTrain.frequency));
        tr.append(td.clone().text(trainTotal));
        $("tbody").append(tr);
    })
})



// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// Assumptions
