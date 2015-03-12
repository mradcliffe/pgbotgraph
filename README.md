# Drupal 8 PostgreSQL Bot Graph

`pgbotgraph` adds d3.js line chart of fails and exceptions listed on http://d8pgbot.erwanderbar.de/ style output through a lot of painful regular expression matching.

## Usage

* Include `dist/pgbotgraph.min.js` in script element at the bottom of the page:
```html
  <script src="dist/pgbotgraph.min.js" type="application/javascript"></script>
  </body>
```
* Add jquery and d3 dependencies in script element within head element:
```html
   <head>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="application/javascript"></script>
     <script src="http://cdnjs.cloudflare.com/ajax/libs/d3/2.10.0/d3.v2.min.js" type="application/javascript"></script>
   </head>
```

## Building

* `npm install`
* `bower install`
* `grunt`

## Testing

* Open `src/index.html` for an example.
