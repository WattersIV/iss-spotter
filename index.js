const { error } = require('console')
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   } 
//   console.log('It worked! Returned IP:' , IP); 
// }); 

// fetchCoordsByIP('69.156.90.241',(error, data) => {
//   if (error) {
//     console.log("It didnt work!", error) 
//     return
//   }
//   console.log('It worked! Coordinates:', data)
// })   

// fetchISSFlyOverTimes({ latitude: '45.33340', longitude: '-79.21630' }, (error, data) => {
//   if (error) {
//     console.log("It didnt work!", error) 
//     return
//   }
//   console.log('It worked! Here are the passing times:', data)
// })

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});