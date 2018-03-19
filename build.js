const Metalsmith = require('metalsmith');
const inPlace = require('metalsmith-in-place');

const metalsmith = Metalsmith(__dirname)
  .source('dev/content')
  .destination('build')
  .clean(true);

metalsmith.use(inPlace({
  "engineOptions": {
    root: __dirname + '/dev/'
  }
}))

metalsmith.build(function(err) {
  if (err) throw err;
});
