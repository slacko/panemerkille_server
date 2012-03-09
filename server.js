var restify = require('restify');
var db = require('mongoose');
db.connect('mongodb://localhost/panemerkilledb');
var UserController=require("./controllers/ctrlUser.js");
function test (req, res, next) {
 console.log(req.url);
 res.send(req.url);
  mongo.user.save();
  return next();
 }

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('/users',  UserController.getUsers);

server.put('/users', test);
server.post('/users', UserController.postUser);

server.del('/users', test);

server.get('/users/:_id', UserController.getUser);
server.put('/users/:id', test);
//server.post('/users/:id', UserContr);
server.del('/users/:id', test);

server.get('/users/:id/friends', test);
server.put('/users/:id/friends', test);
server.post('/users/:id/friends', test);
server.del('/users/:id/friends', test);

server.get('/users/:id/patches', test);
server.put('/users/:id/patches', test);
server.post('/users/:id/patches', test);
server.del('/users/:id/patches', test);

server.get('/venues', test);
server.put('/venues', test);
server.post('/venues', test);
server.del('/venues', test);

server.get('/venues/:id', test);
server.put('/venues/:id', test);
server.post('/venues/:id', test);
server.del('/venues/:id', test);

server.get('/checkins', test);
server.put('/checkins', test);
server.post('/checkins', test);
server.del('/checkins', test);

server.get('/checkins/:id', test);
server.put('/checkins/:id', test);
server.post('/checkins/:id', test);
server.del('/checkins/:id', test);

server.get('/patches', test);
server.put('/patches', test);
server.post('/patches', test);
server.del('/patches', test);

server.get('/patches/:id', test);
server.put('/patches/:id', test);
server.post('/patches/:id', test);
server.del('/patches/:id', test);

server.get('/events', test);
server.put('/events', test);
server.post('/events', test);
server.del('/events', test);

server.get('/events/:id', test);
server.put('/events/:id', test);
server.post('/events/:id', test);
server.del('/events/:id', test);

server.on('NotFound', function(req, res) {
  res.send(404, req.url + ' was not found');
});

server.on('MethodNotAllowed', function(req, res) {
  res.send(405, req.url + ' method not allowed');
});


server.listen(7777, function() {
  console.log('%s listening at %s', server.name, server.url);
});
