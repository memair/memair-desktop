const sqlite3 = require('sqlite3');
const db_location = 'db/memair.db'

const fs = require('fs');
const path = require('path');
const json = require('big-json');


const google_location_history = 'tmp/Takeout/Location History/Location History.json'

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

function build_locations_table() {
  var db = new sqlite3.Database(db_location);
  console.log('building locations table');
  db.run(`
    CREATE TABLE IF NOT EXISTS locations(
      latitude          FLOAT NOT NULL,
      longitude         FLOAT NOT NULL,
      accuracy          FLOAT,
      timestamp         DATETIME NOT NULL
    );`
  )
  db.close()
}

function addLocation(db, raw_location) {
  var moment = require('moment');
  var timestamp = moment.unix(raw_location['timestampMs']/1000).format('YYYY-MM-DD hh:mm:ss.ss')
  var latitude = raw_location['latitudeE7'] / 1e7
  var longitude = raw_location['longitudeE7'] / 1e7
  var accuracy =  raw_location['accuracy']
  db.run(`
    INSERT INTO locations (
      latitude,
      longitude,
      accuracy,
      timestamp
    ) VALUES (
      ${latitude},
      ${longitude},
      ${(accuracy == undefined) ? 'NULL' : accuracy},
      '${timestamp}'
    );
  `)
}
