var path = require('path')  // eslint-disable-line no-var
var express = require('express')  // eslint-disable-line no-var
var webpack = require('webpack')  // eslint-disable-line no-var
var config = require('./webpack.config.dev') // eslint-disable-line no-var
var compression = require('compression') // eslint-disable-line no-var
var ssbKeys = require('ssb-keys')

// var requestProxy = require('express-request-proxy')
// var objectAssign = require('object-assign')

var app = express() // eslint-disable-line no-var
var server = require('http').createServer(app) // eslint-disable-line no-var
var io = require('socket.io')(server) // eslint-disable-line no-var

var compiler = webpack(config) // eslint-disable-line no-var
var port = 3000 // eslint-disable-line no-var

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(compression({
  threshold: 512
}))

app.use('/', express.static('.'))
app.get('/keys/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(require('ssb-keys').generate()))
})

// app.all('*', function(req, res, next) {
//   var url = require('url').parse(req.url)
//   var conf = objectAssign({}, req, {
//     url: 'http://127.0.0.1:8888' + url.pathname,
//     timeout: 120000
//   })
//   requestProxy(conf)(req, res, next)
// })

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

server.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err) // eslint-disable-line no-console
    return
  }
  console.log('Listening at http://localhost:' + port) // eslint-disable-line no-console
})

io.on('connection', function (socket) {
  io.set('origins', '*:*')
  console.log('connected') // eslint-disable-line no-console
  socket.emit('update', 'connected')
  socket.on('single', function () {
    socket.emit('update', 'single')
  })
  socket.on('publish', function (data) {
    io.sockets.emit('update', data)
  })
})
