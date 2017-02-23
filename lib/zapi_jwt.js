/**
 * Created by masudurrahman on 1/19/17.
 */

var jwt = require('atlassian-jwt');
var hashes = require('jshashes');

var Client = function Client() {
    if (arguments.length === 0) {
        throw new Error('an array of BASE_URL, ACCESS_KEY, SECRET_KEY, USER is required');
    }

    var self = this;
    self.BASE_URL=arguments[0];
    self.ACCESS_KEY=arguments[1];
    self.SECRET_KEY=arguments[2];
    self.USER=arguments[3];
    self.HASH_LIB=new hashes.SHA256;

    return self;
}

Client.prototype.generateJWT = function(){

    if (arguments.length === 0) {
        throw new Error('an array of METHOD, URI, JWT_EXPIRE is required');
    }

    var self = this;
    var RELATIVE_PATH = arguments[1].split(self.BASE_URL)[1].split("?")[0];
    var QUERY_STRING = arguments[1].split(self.BASE_URL)[1].split("?")[1];
    var CANONICAL_PATH;
    if(QUERY_STRING) {
        CANONICAL_PATH = arguments[0]+'&'+RELATIVE_PATH+'&'+QUERY_STRING;
    } else {
        CANONICAL_PATH = arguments[0]+'&'+RELATIVE_PATH+'&';
    }
    jwt_payload = {
        'sub': self.USER,
        'qsh': self.HASH_LIB.hex(CANONICAL_PATH),
        'iss': self.ACCESS_KEY,
        'exp': new Date().getTime()+arguments[2],
        'iat': new Date().getTime()
    }

    var token = jwt.encode(jwt_payload, self.SECRET_KEY);

    return token;
}

module.exports = Client;
