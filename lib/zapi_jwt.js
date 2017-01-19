/**
 * Created by masudurrahman on 1/19/17.
 */

//install atlassian-jwt package: e.g: npm install atlassian-jwt
var jwt = require('atlassian-jwt');

//install jshashes package: e.g: npm install jshashes
var hashes = require('jshashes');

// hashLib instance
var hashlib =  new hashes.SHA256;

exports.init = function (BASE_URL, ACCESS_KEY, SECRET_KEY, USER) {
    var self = this;
    self.BASE_URL=BASE_URL;
    self.ACCESS_KEY=ACCESS_KEY;
    self.SECRET_KEY=SECRET_KEY;
    self.USER=USER;
    self.HASH_LIB=new hashes.SHA256;
}

exports.generateJWT = function(METHOD, URI, JWT_EXPIRE){
    var self = this;

    var RELATIVE_PATH = URI.split(self.BASE_URL)[1].split("?")[0];
    var QUERY_STRING = URI.split(self.BASE_URL)[1].split("?")[1];

    var CANONICAL_PATH = METHOD+'&'+RELATIVE_PATH+'&'+QUERY_STRING;
    jwt_payload = {
        'sub': self.USER,
        'qsh': self.HASH_LIB.hex(CANONICAL_PATH),
        'iss': self.ACCESS_KEY,
        'exp': new Date().getTime()+JWT_EXPIRE,
        'iat': new Date().getTime()
    }

    var token = jwt.encode(jwt_payload, SECRET_KEY);

    return token;
}

var request = require('request');

var URL = BASE_URL+RELATIVE_PATH+'?'+QUERY_STRING
console.log(URL)

request({
    method: 'GET',
    url: URL,
    headers: {
//    'Content-Type': 'application/json',
        'Authorization': 'JWT '+token,
        'zapiAccessKey': ACCESS_KEY,
        'User-Agent': 'ZAPI',
    }}, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
});
