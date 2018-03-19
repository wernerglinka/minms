# minms
A minimal Metalsmith setup to test Metalsmith-in-place 2.x.

Metalsmith-in-place is used to transform html/nunjucks source files into final html.

After reading @ismay's **metalsmith-layouts** [README file](https://github.com/ismay/metalsmith-layouts) I had expected that I only need to use the in-place plugin but that doesn't work as expected.

Source file: _/dev/content/index.njk_
```
---
title: test page
layout: page.html
---

<h1>{{ title }}</h1>

<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod.</p>
```

Template file: _/dev/template/page.html_
```
<!doctype html>
<html lang="en" itemscope itemtype=”http://schema.org/Article”>
  <head>
    The page head
  </head>

  <body>
    <div class="container">
        <section >
            {{ contents }}
        </section>
    </div>
  </body>
</html>
```

Build file: _/build.js_
```
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
```

## After running build.js this results in _/build/index.html_
```
<h1>test page</h1>

<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod.</p>
```

## Expected result
```
<!doctype html>
<html lang="en" itemscope itemtype=”http://schema.org/Article”>
  <head>
    The page head
  </head>

  <body>
    <div class="container">
        <section >
            <h1>test page</h1>

            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Etiam porta sem malesuada magna mollis euismod.</p>
        </section>
    </div>
  </body>
</html>
```
