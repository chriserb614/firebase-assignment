var config = {
    apiKey: "AIzaSyDuj-Cw1-GY4ETuIqQpKWgIqxVv6NNQhbY",
    authDomain: "train-app-1257c.firebaseapp.com",
    databaseURL: "https://train-app-1257c.firebaseio.com",
    projectId: "train-app-1257c",
    storageBucket: "",
    messagingSenderId: "1006657585567"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainFrequency = 0;

      
      $("#submitBtn").on("click", function (){
        event.preventDefault();
        var trainName = $("#name").val().trim();
        var trainDest = $("#destination").val().trim();
        var trainTime = $("#time").val().trim();
        var trainFreq = $("#frequency").val().trim();
        
        database.ref("/trains").push({
          Name: trainName,
          Train_Destination: trainDest,
          Train_Time: trainTime,
          Train_Frequency: trainFreq 
        })
        
        $("#name").val("");
        $("#destination").val("")
        $("#frequency").val("")
        $("#time").val("")
        
        return false;
      })
      
      
      var currentTime = moment();
      $("#current-time").html("Current Time: " + moment(currentTime).format("HH:mm"))

      
      database.ref("/trains").on("child_added", function (snapshot){
        console.log(snapshot.val());
        
        var trainName = snapshot.val().Name
        var trainDest = snapshot.val().Train_Destination
        var trainFreq = snapshot.val().Train_Frequency
        var firstTime = snapshot.val().Train_Time
        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years")
        console.log("Converted Time: " + firstTimeConverted)
        
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("Difference in Time: " + diffTime)
        
        var timeApart = diffTime % trainFreq;
        console.log(timeApart)
        
        var trainAway = trainFreq - timeApart;
        console.log("Minutes Away: " + trainAway)
        
        var nextArrival = moment().add(trainAway, "minutes");
        console.log("Next Arrival: " + moment(nextArrival).format("hh:mm"));
        
        var militaryTrain = moment(nextArrival).format("HH:mm")
        
        $("#trainTime-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + militaryTrain + "</td><td>" + trainAway + "</td><tr>")
        
      })
      
      