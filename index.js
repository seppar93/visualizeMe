var mfp = require("mfp");
const fs = require('fs');

var dataSet;
mfp.fetchDateRange('SepehrP', '2017-09-15', '2017-09-22', ['calories', 'protein', 'carbs', 'fat'], function(data){
  // console.log(data['data']);
  return dataSet = data
});

setTimeout(function () {
  // console.log(dataSet);
  fs.writeFileSync("example.js",'var profileData='+JSON.stringify(dataSet));

},3000);


// import * as data from "example.json";
// console.log(data);
