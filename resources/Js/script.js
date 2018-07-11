
    var caloriesToGraph = [];
    var dateToGraph = []

//all this will be pulled by the API//
var myJSON = { username: 'nounasafaei',
  data:
   [ { calories: 1403,
       carbs: 81,
       fat: 72,
       protein: 108,
       date: '2017-09-15' },
     { calories: 2175,
       carbs: 92,
       fat: 150,
       protein: 139,
       date: '2017-09-16' },
     { calories: 1615,
       carbs: 97,
       fat: 108,
       protein: 89,
       date: '2017-09-17' },
     { calories: 1768,
       carbs: 91,
       fat: 102,
       protein: 139,
       date: '2017-09-18' },
     { calories: 1749,
       carbs: 62,
       fat: 127,
       protein: 114,
       date: '2017-09-19' },
     { calories: 3020,
       carbs: 202,
       fat: 191,
       protein: 147,
       date: '2017-09-20' },
     { calories: 806,
       carbs: 28,
       fat: 48,
       protein: 48,
       date: '2017-09-21' },
     { calories: 1202,
       carbs: 71,
       fat: 53,
       protein: 113,
       date: '2017-09-22' } ] }

console.log(myJSON)

    var myArray = myJSON.data
console.log(myArray)

    for (i=0; i<myArray.length; i++){
        caloriesToGraph.push(myArray[i].calories)
        dateToGraph.push(myArray[i].date)
    }
console.log(caloriesToGraph)
console.log(dateToGraph)

var ctx = document.getElementById("calories"); // whatever name we are going to give the calories div
var caloriesChart = new Chart(ctx, {
    type: 'bar',  //NOTE: ideally we can make this tied to a dropdown menu on the HTML to change chart type
    data: {
      labels : dateToGraph,  //the variable pulled from the JSON loop
      datasets: [ {
        label: "Calorie example",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: caloriesToGraph,     //the other variable pulled from the JSON loop
    }]
  },
  options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
});
var ctx = document.getElementById("pie");
var myChart = new Chart(ctx, {
    //type of chart
    type: 'pie',
    data: {
        labels: ["Calories", "Proteins", "Carbs", "Fats"],
        datasets: [{
            label: 'Weekly Intake',
            //values for chart to display
            data: [myArray[0].calories, myArray[0].protein, myArray[0].carbs, myArray[0].fat],
            //colours used for graphing labels above
            backgroundColor: [
                'rgba(153,255,51,0.4)',
                'rgba(255,153,0,0.4)',
                'rgba(260,200,60,0.4)',
                'rgba(63, 63, 191,0.4)',
            ],
            //border colors used for the labels above
            borderColor: [
                'rgba(153,255,51,1)',
                'rgba(255,153,0, 1)',
                'rgba(260,200,60, 1)',
                'rgba(63, 63, 191,1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        //if we wanted to add graph lines, we would do so in here. 
    }
});