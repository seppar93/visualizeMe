const brain = require( 'brain.js');
var net = new brain.NeuralNetwork();

var mfp = require("mfp");
const fs = require('fs');


mfp.fetchDateRange('SepehrP', '2017-09-15', '2017-09-22', ['calories', 'protein', 'carbs', 'fat'], function(dataSet){
  // console.log(data['data']);


  let calories = getData(dataSet,getCalories)
  // console.log(dataTrain(calories,2000));
  net.train(dataTrain(calories,2000));
  var output = net.run({ calories: 1800});
  // console.log(output);

  dataSet.trainedOuput = output;













  fs.writeFileSync("dataset.js",'var profileData='+JSON.stringify(dataSet, null ,2));
});

// setTimeout(function () {
  // console.log(dataSet);

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

  function dataTrain(arrayCalories,calorieLevel) {
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
