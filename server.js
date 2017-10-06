var express = require('express')
var serveStatic = require('serve-static')
var morgan = require('morgan')
var app = express()

app.use(morgan('short'));
app.use(serveStatic('./', { 'index': ['index.html'] }))
app.listen(3000)
