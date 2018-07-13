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


function getData(dataset,getFunction) {
  for(let key in dataset) {
    if (key === "data") {
      let info = dataset[key];
      return getFunction(info);
    }
  }
}

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

console.log(sum(getData(profileData,getCalories)));

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
//     datasets: [{
//       label: 'Calories',
//       data: getData(profileData,getCalories), //[1403, 2175, 1615, 1768, 1749, 3020, 806],
//       backgroundColor: "rgba(153,255,51,0.4)"
//     }, {
//       label: 'protien',
//       data: getData(profileData,getProtein), //[108, 139, 139, 147, 48, 16, 113],
//       backgroundColor: "rgba(255,153,0,0.4)"
//     },{
//       label: 'carbs',
//       data: getData(profileData,getCarbs), //[81, 92, 97, 147, 27, 250, 113],
//       backgroundColor: "rgba(260,200,60,0.4)"
//     }, {
//       label: 'fat',
//       data: getData(profileData,getFats), //[72, 150, 108, 102, 127, 191, 113],
//       backgroundColor: "rgba(63, 63, 191,0.4)"
//     }]
//   }
// });

////////////////////////////////////////////////////////////////////////////////

var ctx = document.getElementById("calories"); 
var caloriesChart = new Chart(ctx, {
type: 'bar',  
data: {
  labels : getData(profileData,getDate),  
  datasets: [ {
    label: "Calorie example",
    backgroundColor: 'rgba(255,99,132,0.4)',
    borderColor: 'rgba(255,99,132,1)',
    data: getData(profileData,getCalories), 
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
type: 'pie',
data: {
    labels: ["Proteins", "Carbs", "Fats"],
    datasets: [{
        label: 'Weekly Intake',
        data: [sum(getData(profileData,getProtein)), sum(getData(profileData,getCarbs)), sum(getData(profileData,getFats))],
        backgroundColor: [
            'rgba(153,255,51,0.3)',
            'rgba(255,153,0,0.3)',
            'rgba(260,200,60,0.3)'
        ],
        borderColor: [
            'rgba(153,255,51,1)',
            'rgba(255,153,0,1)',
            'rgba(260,200,60,1)'
        ],
        borderWidth: 1
    }]
},
options: {

}
});

var ctx = document.getElementById("time"); 
var caloriesChart = new Chart(ctx, {
    type: 'line', 
    data: {
      labels : getData(profileData,getDate),  
      datasets: [ {
        label: "calories",
        backgroundColor: 'rgba(0,250,154,0.4)',
        borderColor: 'rgba(0,250,154,1)',
        data: getData(profileData,getCalories) ,    
    }]
  },
});

var ctx = document.getElementById("macros"); 
var caloriesChart = new Chart(ctx, {
type: 'bar',  
data: {
  labels : getData(profileData,getDate), 
  datasets: [  {
       label: 'protein',
       data: getData(profileData,getProtein), 
      backgroundColor: "rgba(240,152,38,0.4)",
      borderColor: "rgba(240,152,38,1)"
     },{
       label: 'carbs', 
      data: getData(profileData,getCarbs), 
       backgroundColor: "rgba(51,38,240,0.4)",
       borderColor: "rgba(51,51,240,1)",
     }, {
       label: 'fat',
       data: getData(profileData,getFats), 
       backgroundColor: "rgba(38,227,240,0.4)",
       borderColor: "rgba(38,227,240,1)",
}]
},
options: {
  scales: {
    yAxes: [{
      stacked: true
    }],
    xAxes: [{
      stacked: true
    }]
  }
}
});