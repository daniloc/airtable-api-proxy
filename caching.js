// caching.js
// Where we load json files from local storage to ease load on Airtable rate limit

const fs = require('fs');

// ^ fs allows us to read or write to a file for caching

const cacheInterval = 60 * 5; //5 minutes

// ^ If the cache is less than this many minutes old, serve it


module.exports = {

  writeCacheWithPath: function(path, object) {
  
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