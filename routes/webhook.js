const io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });

module.exports = function (app) {
  app.route('/webhook/fb_message')
    .get(function (req, res) {
      var nsp = io.of('/chat')
      var room = req.query.room
      console.log(req.query)
      console.log(room)
      nsp.to(room).emit('aMessage', req.query.message );
      // io.emit('news', { hello: 'demo 2', req: req.body });

      res.send('Got a Get request');
    })
    .post(function (req, res) {
      var nsp = io.of('/chat')
      var room = req.query.room
      console.log(room)
      nsp.to(room).emit('aMessage', req.query.message );

      res.send('Got a POST request');
    })
    .put(function (req, res) {
      res.send('Got a PUT request at /user');
    })
    .delete(function (req, res) {
      res.send('Got a DELETE request at /user');
    });

  app.get('/send_notify', function (req, res) {
    var userEmail = req.query.username
    var nsp = io.of('/notify')
    console.log(userEmail)
    console.log(req.query.message)
    nsp.to(userEmail).emit('receiveNotify', req.query.message );
    res.send('Send notify success');
  });
  app.get('/', function (req, res) {
    res.render('pages/index');
  });

  // about page 
  app.get('/about', function (req, res) {
    res.render('pages/about');
  });
}
