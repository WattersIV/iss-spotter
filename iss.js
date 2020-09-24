const { error } = require('console')
const request = require('request')


const fetchMyIP = function(callback) { 
  request('https://api.ipify.org?format=json',(error, response, body) => {  
    if (error) {
      callback(error, null)
      return 0
    } 
    if (response.statusCode !== 200) {
      callback(Error(response.statusCode),null) 
      return 0
    }
    const IP = JSON.parse(body).ip 
    callback(null, IP) 
  })
} 

const fetchCoordsByIP = (IP, callback) => {
  request(`https://ipvigilante.com/${IP}`,(error, response, body) => {
    if (error) {
      callback(error, null)
    }
    else if (response.statusCode !== 200) {
      callback(Error(`Couldnt find coordinates for ${IP}`), null)
    } else {
      const long = JSON.parse(body).data.longitude 
      const lat = JSON.parse(body).data.latitude    
      const coord = {
        latitude: lat,
        longitude: long 
      }  
      callback(null, coord)
    }
  })
} 
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.latitude}`,(error, response, body) => {
    if (error) {
      callback(error, null)
    }
    else if (response.statusCode !== 200) {
      callback(Error(`Couldnt find sightings for ${coords}`), null)
    } else {
      const data = JSON.parse(body).response  
      callback(null, data)
    }
  })  
}; 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback (error, null)
    }  
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback (error, null)
      } 
      fetchISSFlyOverTimes(coords,(error, data) => {
        if (error) {
          return callback(error, null)
        } 
        callback(null, data)
      })
    })
  }) 
  
}


module.exports = { 
  fetchMyIP, 
  fetchCoordsByIP, 
  fetchISSFlyOverTimes, 
  nextISSTimesForMyLocation
}; 