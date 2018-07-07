var mfp = require("mfp")
mfp.fetchDateRange('SepehrP', '2017-09-15', '2018-09-18', ['calories', 'protein', 'carbs', 'fat'], function(data){
  console.log(data);
});
