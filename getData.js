// function getCalories(dataset) {
//   let cal = [];
//
//   for(let key in dataset) {
//     if (key === "data") {
//       let info = dataset[key];
//       // console.log(info);
//       for (var i = 0; i < info.length; i++) {
//         let arraySet = info[i];
//         cal.push(arraySet.calories)
//         // console.log(arraySet.calories);
//       }
//     }
//   }
//   return cal;
// }
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////DATA RETREVAL FUNCTION/////////////////////////

function getData(dataset,getFunction) {
  for(let key in dataset) {
    if (key === "data") {
      let info = dataset[key];
      return getFunction(info);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////INPUT FUNCTIONS////////////////////////////////


function getCalories(info) {
  let cal = [];
  for (var i = 0; i < info.length; i++) {
    let arraySet = info[i];
    cal.push(arraySet.calories);
    // console.log(arraySet.calories);
  }
  return cal;

}

function getCarbs(info) {
  let carbs = [];
  for (var i = 0; i < info.length; i++) {
    let arraySet = info[i];
    carbs.push(arraySet.carbs);
    // console.log(arraySet.calories);
  }
  return carbs;

}

function getFats(info) {
  let fats = [];
  for (var i = 0; i < info.length; i++) {
    let arraySet = info[i];
    fats.push(arraySet.fat);
    // console.log(arraySet.calories);
  }
  return fats;
}

function getProtein(info) {
  let proteins = [];
  for (var i = 0; i < info.length; i++) {
    let arraySet = info[i];
    proteins.push(arraySet.protein);
    // console.log(arraySet.calories);
  }
  return proteins;
}

function getDate(info) {
  let date = [];
  for (var i = 0; i < info.length; i++) {
    let arraySet = info[i];
    date.push(arraySet.date);
  }
  return date;

}
// console.log(getData(profileData,getCalories));
// console.log(getData(profileData,getCarbs));
// console.log(getData(profileData,getFats));
// console.log(getData(profileData,getProtein));
// console.log(getData(profileData,getDate));

function sum(arr) {
  return arr.reduce((accum, curr) => accum + curr);
}

// console.log(sum(getData(profileData,getCalories)));

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////GRAPHS/////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////STACKED CALORIE BAR GRAPH//////////////////////

var ctx = document.getElementById("stacked-bar-graph"); // whatever name we are going to give the calories div
var caloriesChart = new Chart(ctx, {
type: 'bar',  //NOTE: ideally we can make this tied to a dropdown menu on the HTML to change chart type
data: {
  labels : getData(profileData,getDate),  //the variable pulled from the JSON loop
  datasets: [ {
    label: "Calorie example",
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: getData(profileData,getCalories),     //the other variable pulled from the JSON loop
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

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////MACROS PIE GRAPH///////////////////////////////

var ctx = document.getElementById("macros-pie-bar");
var myChart = new Chart(ctx, {
//type of chart
type: 'pie',
data: {
    labels: ["Proteins", "Carbs", "Fats"],
    datasets: [{
        label: 'Weekly Intake',
        //values for chart to display
        data: [sum(getData(profileData,getProtein)), sum(getData(profileData,getCarbs)), sum(getData(profileData,getFats))],
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

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////CALORIES LINE GRAPH///////////////////////////////


var ctx = document.getElementById("calorie-line-graph"); // <-- div for area hold weight line graph goes in here
var caloriesChart = new Chart(ctx, {
    type: 'line', //type of chart
    data: {
      labels : getData(profileData,getDate),  //variable for dates
      datasets: [ {
        label: "calories",//name of chart
        backgroundColor: 'rgba(rgb(0,250,154,0.4)',
        borderColor: 'rgba(rgb(0,250,154,1)',
        data: getData(profileData,getCalories) ,     //<--the weight variable pulled from the JSON loop
    }]
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////CARBS LINE GRAPH///////////////////////////////

var ctx = document.getElementById("calorie-carbs-graph"); // <-- div for area hold weight line graph goes in here
var caloriesChart = new Chart(ctx, {
    type: 'line', //type of chart
    data: {
      labels : getData(profileData,getDate),  //variable for dates
      datasets: [ {
        label: "calories",//name of chart
        backgroundColor: 'rgba(rgb(0,250,154,0.4)',
        borderColor: 'rgba(rgb(0,250,154,1)',
        data: getData(profileData,getCarbs) ,     //<--the weight variable pulled from the JSON loop
    }]
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////PROTIEN LINE GRAPH/////////////////////////////
var ctx = document.getElementById("calorie-protein-graph"); // <-- div for area hold weight line graph goes in here
var caloriesChart = new Chart(ctx, {
    type: 'line', //type of chart
    data: {
      labels : getData(profileData,getProtein),  //variable for dates
      datasets: [ {
        label: "calories",//name of chart
        backgroundColor: 'rgba(rgb(0,250,154,0.4)',
        borderColor: 'rgba(rgb(0,250,154,1)',
        data: getData(profileData,getCarbs) ,     //<--the weight variable pulled from the JSON loop
    }]
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////FAT LINE GRAPH/////////////////////////////////
var ctx = document.getElementById("calorie-fat-graph"); // <-- div for area hold weight line graph goes in here
var caloriesChart = new Chart(ctx, {
    type: 'line', //type of chart
    data: {
      labels : getData(profileData,getProtein),  //variable for dates
      datasets: [ {
        label: "calories",//name of chart
        backgroundColor: 'rgba(rgb(0,250,154,0.4)',
        borderColor: 'rgba(rgb(0,250,154,1)',
        data: getData(profileData,getFats) ,     //<--the weight variable pulled from the JSON loop
    }]
  },
});


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////BRAIN.JS///////////////////////////////////////
console.log(Math.floor((profileData.trainedOuput.cal) * 100) + "%");
