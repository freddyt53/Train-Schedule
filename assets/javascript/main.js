//initialize firebase
var config = {
  apiKey: "AIzaSyBAcB4M8POs1eX59ySZAP7ly4kuEflh9u8",
  authDomain: "train-homework-f51ea.firebaseapp.com",
  databaseURL: "https://train-homework-f51ea.firebaseio.com",
  projectId: "train-homework-f51ea",
  storageBucket: "train-homework-f51ea.appspot.com",
  messagingSenderId: "4232467948"
};
firebase.initializeApp(config);

var trainData = firebase.database();

//button function
$('#submitTrain').on("click", function (event) {
  event.preventDefault();

  //user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainTimeInput").val(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();

  //local var to hold the user information
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  }

  //pushes data to database
  trainData.ref().push(newTrain);

  //console log to test variables
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainTimeInput").val("");
  $("#frequencyInput").val("");

  console.log($("#firstTrainTimeInput").val());
  return false;
});

// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var data = childSnapshot.val();
  tName = data.name;
  dest = data.destination;
  fTrain = data.firstTrain;
  freq = data.frequency;

  //console logs info
  console.log(tName);
  console.log(dest);
  console.log(fTrain);
  console.log(freq);

  //calculates time away
  var tRemainder = moment().diff(moment.unix(fTrain), "minutes") % freq;

  var tMinutes = freq - tRemainder;

  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");



  //calls the correct rows to display info in 
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(tArrival),
    $("<td>").text(tMinutes),

  );

  //appends text to destination schedule
  $("#train-table > tbody").append(newRow);

});

