// caching.js
// Where we load json files from local storage to ease load on Airtable rate limit

const fs = require('fs');

// ^ fs allows us to read or write to a file for caching

var cacheInterval = 60 * 5; //5 minutes

// ^ If the cache is less than this many minutes old, serve it


module.exports = {
  
  setCacheInterval: function(interval) {
    cacheInterval = interval;
  },

  writeCacheWithPath: function(path, object) {
    
    var pathComponents = path.split("/");
    var intermediatePath = "";
    
    for (var i = 0; i < pathComponents.length - 1; i++) {
     
      var pathComponent = pathComponents[i];
      pathComponent = pathComponent + "/";
      intermediatePath = intermediatePath + pathComponent;
      
      if (fs.existsSync(intermediatePath) != true) {
         fs.mkdirSync(intermediatePath); 
      }
      
    }
  
    fs.writeFile(path, JSON.stringify(object), function(err) {
      if (err) throw err;
      else console.log("Cache write succeeded: " + path);
    });
    
  },

  readCacheWithPath: function(path) {

    var shouldSendCache = false;

    if (fs.existsSync(path)) {
      var cachedTime = fs.statSync(path).ctime;

      if ((new Date().getTime() / 1000.0 - cachedTime / 1000.0) < cacheInterval) {

        shouldSendCache = true;

      }
    }

    if (!shouldSendCache) return null;
    else return JSON.parse(fs.readFileSync(path, 'utf8'));

  }

}