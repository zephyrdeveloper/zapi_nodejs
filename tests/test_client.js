/**
 * Created by masudurrahman on 1/19/17.
 */


//include library
var Client = require('zapi_nodejs');

//set credentials
var BASE_URL = 'https://c505465a.ngrok.io'
var ACCESS_KEY = 'MTZhOGQ5OTEtOTI0OS0zNzdmLWIyZTAtYTFkOTFhZTI2OTczIDEyMzQ1NjoxMjM0YWJjZC0xMjM0LWFiY2QtMTIzNC0xMjM0YWJjZDEyMzQgVVNFUl9ERUZBVUxUX05BTUU='
var SECRET_KEY = 'BaZmvGPS5y4hJ_MQYcudbayV7Xb7cza6VsX8vEEwduo'
var ACCOUNT_ID = '123456:1234abcd-1234-abcd-1234-1234abcd1234'

//create client
var JwtClient = new Client(BASE_URL, ACCESS_KEY, SECRET_KEY, ACCOUNT_ID);


//Get List of Cycles
var METHOD = "GET"
var API_URI = 'https://c505465a.ngrok.io/public/rest/api/1.0/cycles/search?projectId=10000&versionId=10000'
var JWT_EXPIRE = 3600

var token = JwtClient.generateJWT(METHOD, API_URI, JWT_EXPIRE);
console.log(token);

var request = require('request');

request({
    method: 'GET',
    url: API_URI,
    headers: {
        'Authorization': 'JWT '+token,
        'zapiAccessKey': ACCESS_KEY,
        'User-Agent': 'ZAPI',
    }}, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
});