var Metalsmith = require('metalsmith');
var inPlace = require('metalsmith-in-place');
var path = require('path');


Metalsmith(__dirname)
    .source('./dev/content')      
    .destination('./build')
    .clean(true)                  

    .use(inPlace({
        "pattern": "**/*.njk",
        "engineOptions": {
            path: path.join(__dirname, 'layout')
        }
    }))

    .build(function(err) {    
        if (err) throw err;
    });