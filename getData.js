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
/////////////////////////////////API DATA///////////////////////////////////////
// var foodName;
// var foodNutrientValue;

var nutrientLookup = nutrientSearch()
function nutrientSearch(){
    $('#foodSearch').on('click', function(){
        var APIKey = 'api_key=AChcEWV59WuOEXHT383nb04fkKXXtobx5EhmViQB';
        var nutrientChoice = 'nutrients=' + $('#nutrient').val()
        var foodGroup = 'fg=' + $('#foodGroup').val()
        var queryURL = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&' + APIKey + '&' + nutrientChoice + '&' + foodGroup + '&subset=1&sort=c&max=5'
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                var nutritionArray = response.report.foods
                var nutritionNameArray = [];
                var nutrientValueArray = [];
                for (i in nutritionArray){
                    nutritionNameArray.push(nutritionArray[i].name);
                }
                for (j = 0; j < nutritionArray.length; j++){
                    var nutritionInfo = nutritionArray[j].nutrients
                    for (k in nutritionInfo){
                        nutrientValueArray.push(nutritionInfo[k].value);
                    }
                }
///////////////////////////////API Graph////////////////////////////////////////
                  var ctx = document.getElementById("api-bar-graph"); // whatever name we are going to give the calories div
                  var caloriesChart = new Chart(ctx, {
                    type: 'bar',  //NOTE: ideally we can make this tied to a dropdown menu on the HTML to change chart type
                    data: {
                      labels : nutritionNameArray,  //the variable pulled from the JSON loop
                      datasets: [ {
                        label: "Calorie example",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: nutrientValueArray,     //the other variable pulled from the JSON loop
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
                });
              })
            }


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////DATA RETREVAL FUNCTION/////////////////////////

function getData(dataset,getFunction) {
  // if ("data" in dataset) {
  //   return dataset["data"];
  // }
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
  labels : getData(profileData,getDate),
  datasets: [{
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
        backgroundColor: 'rgba(0,250,154,0.4)',
        borderColor: 'rgba(0,250,154,1)',
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
        label: "carbs",//name of chart
        backgroundColor: 'rgba(0,250,154,0.4)',
        borderColor: 'rgba(0,250,154,1)',
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
        label: "protien",//name of chart
        backgroundColor: 'rgba(0,250,154,0.4)',
        borderColor: 'rgba(0,250,154,1)',
        data: getData(profileData,getProtein) ,     //<--the weight variable pulled from the JSON loop
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
        label: "fats",//name of chart
        backgroundColor: 'rgba(0,250,154,0.4)',
        borderColor: 'rgba(0,250,154,1)',
        data: getData(profileData,getFats) ,     //<--the weight variable pulled from the JSON loop
    }]
  },
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////API Graph/////////////////////////////////

// var ctx = document.getElementById("api-calorie-graph"); // whatever name we are going to give the calories div
// var caloriesChart = new Chart(ctx, {
// type: 'bar',  //NOTE: ideally we can make this tied to a dropdown menu on the HTML to change chart type
// data: {
//   labels : foodName,  //the variable pulled from the JSON loop
//   datasets: [ {
//     label: "Calorie example",
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: foodNutrientValue,     //the other variable pulled from the JSON loop
// }]
// },
// options: {
// scales: {
//     yAxes: [{
//         ticks: {
//             beginAtZero: true
//         }
//     }]
// }
// }
// });

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////API////////////////////////////////////////////

var recipeLookup = recipeSearch()
function recipeSearch(){
    $('#recipeSearch').on("click", function(){
        var APIKey = '&app_key=0ada957d3714df14b9602bc7869a6178';
        var applicationID = '&app_id=683d8f0f';
        var q = $("#recipeQuery").val();
        var queryURL = 'https://api.edamam.com/api/food-database/parser?ingr=' + q +APIKey + applicationID ;
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            console.log(response.hints)
            recipeArray = response.hints
            console.log(recipeArray)
            for (i=0; i < recipeArray.length; i++){
                var recipeName = recipeArray[i].food.label
                console.log(recipeName)  // x axis
                var recipeNutrients = recipeArray[i].food.nutrients // yaxis
                console.log(recipeNutrients)

            }
        })
    })
}


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////BRAIN.JS///////////////////////////////////////
console.log(Math.floor((profileData.trainedOuput.cal) * 100) + "%");
