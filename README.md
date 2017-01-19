## Usage

### Install with npm
    npm install zapi_nodejs

### Include Library
    var Client = require("zapi_nodejs");
 
### Define ZAPI credentials

    var BASE_URL = '<zfj cloud baseUrl goes here>'
    var ACCESS_KEY = '<your accessKey goes here>'
    var SECRET_KEY = '<your secretKey goes here>'
    var USER = '<your userName goes here>'

### Create Instance
     var JwtClient = new Client(BASE_URL, ACCESS_KEY, SECRET_KEY, USER);
 
### To Create API Specific JWT Token.
 
      var METHOD = '<api method goes here>'
      var API_URI = '<api uri goes here>'
      var JWT_EXPIRE = <expiration time(in ms) goes here>
      
      var token = JwtClient.generateJWT(METHOD, API_URI, JWT_EXPIRE);
      
      console.log(token);
