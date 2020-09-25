const request = require('request-promise-native'); 

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
} 
const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip 
  return request(`https://ipvigilante.com/${IP}`)
}
const fetchISSFlyOverTimes = (body) => {
  const long = JSON.parse(body).data.longitude 
  const lat = JSON.parse(body).data.latitude    
  const coords = {
    latitude: lat,
    longitude: long  
  } 
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.latitude}`)
} 

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
}