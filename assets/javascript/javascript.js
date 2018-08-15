// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIt0P2DoeDadhT2Ohn0wkQONFDgnv_CWM",
    authDomain: "crg-firebase.firebaseapp.com",
    databaseURL: "https://crg-firebase.firebaseio.com",
    projectId: "crg-firebase",
    storageBucket: "",
    messagingSenderId: "958050179303"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var name = "";
var role = "";
var startDate = 0;
var monthlyRate = 0;

// Capture Button Click
$("#submitButton").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#employeeName").val().trim();
    role = $("#employeeRole").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();

    database.ref('/users').once('value')
        .then((snapshot) => {
            const users = snapshot.val() || [];
            users.push({
                name, role, startDate, monthlyRate,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });

            database.ref('/users').set(users);
        });
});


database.ref('/users').orderByChild("dateAdded").on("child_added", function (snapshot) {
    const users = snapshot.val();

    var tr = $('<tr>');
    tr.append(`
  <td>${users.name}</td>
  <td>${users.role}</td>
  <td>${users.startDate}</td>
  <td>${users.monthlyRate}</td>`)
    $('#employeeList').append(tr);
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});