/*TODO

*/
var User = require('../models/user.js');
var db = require('mongoose');
db.connect('mongodb://localhost/panemerkilledb');
var APIeasy = require('api-easy'),
    assert = require('assert');

var suite = APIeasy.describe('/users');
suite.use('localhost', 7777);

suite.discuss('When using the User resource')
suite.before('set up the context', function(ongoing) {
    User.remove({}, function  (err) {});
    return ongoing;
});

suite.discuss('When testing error codes')
  .setHeader('Content-Type', 'application/x-www-form-urlencoded')
  .put('/users/michele').expect(404)
  .put('/users').expect(405)
  .post('/users/michele').expect(405)
  .get('/users/michele').expect(404)
.undiscuss();

suite.discuss('When testing GET /users')
.get('/users').expect(200)
.expect('should respond with a not null JSON object', function(err, res, body) {
  var result = JSON.parse(body);
  assert.isNotNull(result);
})
.expect('should return an empty JSON array', function  (err, res, body) { 
   var results = JSON.parse(body);
   assert.isEmpty(results);
})
.get('/users', {firstname:'Davide', surname:'F', dummy:'notthere'})
.expect('should ignore the dummy param', function(err, res, body){
  var result=JSON.parse(body);
  assert.isNotNull(result);
  assert.include(result.name, 'Davide');
})
.get('/users', {firstname:'Michele', surname:'F', dummy:'notthere'})
.expect('should be empty despite the dummy parameter', function  (err, res, body) {
  var result=JSON.parse(body);
  assert.isEmpty(result);
})
.undiscuss();

suite.discuss('When testing POST /users')
.setHeader('Content-Type', 'application/x-www-form-urlencoded')
.post('/users', {
    firstname:'Davide',
    surname:'F',
    birthdate:'06/16/1985',
    gender:'male',
    picture_url:'none',
    facebook_id:'Aldo',
    email:'mia@mio.fi'
  })
.expect('should return a not null JSON object', function  (err, res, body) {
  var result = JSON.parse(body);
  assert.isNotNull(result);
})
.undiscuss()
//Following can't be tested since the id seems to change everytime
// suite.discuss('When passig undefined parameters')
// .setHeader('Content-Type', 'application/x-www-form-urlencoded')
// .put('/users/4f6da1edff8957b025000001',{})
// .expect('should return error message', function(err, res, body) {
//   var result=JSON.parse(body);
//   assert.include(result, 'Required parameter missing');
// })
// .undiscuss()
.export(module);