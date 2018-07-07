var mfp = require("mfp")

mfp.fetchSingleDate('SepehrP', '2014-09-15', 'all', function(data){
  console.log(data);
});
