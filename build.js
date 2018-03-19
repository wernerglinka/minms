const Metalsmith = require('metalsmith');
const inPlace = require('metalsmith-in-place');
const path = require('path');

const metalsmith = Metalsmith(__dirname)
  .source('dev/content')
  .destination('build')
  //.ignore(__dirname + "/**/_*.njk")
  .clean(true);

metalsmith.use(inPlace({
  "pattern": "**/*.njk",
  "engineOptions": {
    root: __dirname + '/dev/'
  }
}))

metalsmith.build(function(err) {
  if (err) throw err;
});
