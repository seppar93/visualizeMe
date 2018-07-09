  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2DnXzYbdUXxn8EHwAm4bnn6Hyytm6clg",
    authDomain: "visualize-me-database.firebaseapp.com",
    databaseURL: "https://visualize-me-database.firebaseio.com",
    projectId: "visualize-me-database",
    storageBucket: "",
    messagingSenderId: "44390363684"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//leaving space for whatever we use the database for


//blank chart template from chart.js documentation
var ctx = document.getElementById("calories").getContext('2d'); // whatever name we are going to give the calories div
var caloriesChart = new Chart(ctx, {
    type: 'line',
    data: {
      //data pulled from the API should populate here
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
