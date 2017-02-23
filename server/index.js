'use strict'
const express = require('express');
// const api = require('./api/api');
const app = express();
const port = process.env.PORT || 8000;

require('./middleware')(app, express);

app.get('*', function(req, res, next) {
  res.redirect('/');
  next();
});

app.listen(port, function() {
  console.log('listening on port ' + port);
});
