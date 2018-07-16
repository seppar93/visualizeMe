const brain = require( 'brain.js'); // use of brain.js libary
var net = new brain.NeuralNetwork(); // setting up neural network

var mfp = require("mfp"); // setting up variable to use MFP module
const fs = require('fs'); // set up fire writing module


mfp.fetchDateRange('Charoolz', '2018-01-15', '2018-07-01', ['calories', 'protein', 'carbs', 'fat'], function(dataSet){
  // console.log(data['data']);
  // console.log(dataSet);

  let calories = getData(dataSet,getCalories)
  // console.log(dataTrain(calories,2000));
  net.train(dataTrain(calories,2500)); // calorie limit and the ammount eatin over the years
  var output = net.run({ calories: 1800}); // calorie limit inputed for the week
  // console.log(output);

  dataSet.trainedOuput = output; // resule

  fs.writeFileSync("dataset.js",'var profileData='+JSON.stringify(dataSet, null ,2)); // writing javascript file formated
});

// setTimeout(function () {
  // console.log(dataSet);

  function getData(dataset,getFunction) { // higher orderd function taking data and function
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

  function dataTrain(arrayCalories,calorieLevel) { // function takes all calories and the level to look for 
    let whatIneed = [];
    // console.log(arrayCalories);

    for (var i = 0; i < arrayCalories.length; i++) {
      let num = arrayCalories[i];
      let expectedResult = true;
      if (num > calorieLevel) {
        expectedResult = false;
      }
      let format = {input: {calories: num}, output: { cal: expectedResult } };
      whatIneed.push(format);

    }
    return whatIneed;

  }

// },1000);


// import * as data from "example.json";
// console.log(data);
