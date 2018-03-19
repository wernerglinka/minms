const Metalsmith = require('metalsmith');
const inPlace = require('metalsmith-in-place');
const dateFilter = require("nunjucks-date-filter");

const UTCdate = function (date) {
    "use strict";
    return date.toUTCString();
}







const metalsmith = Metalsmith(__dirname)
  .source('dev/content')
  .destination('build')
  .clean(true);

metalsmith.use(inPlace({
  "engineOptions": {
    root: __dirname + '/dev/',
    filters: {
        dateFilter: dateFilter,
        UTCdate: UTCdate
    }
  }
}))

metalsmith.build(function(err) {
  if (err) throw err;
});
