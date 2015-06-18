# UV Index

Note: This a JavaScript port of the original UV App that already exists on Apple App store at https://itunes.apple.com/us/app/uv-index/id862966738?mt=8


Step 1:
react-native init uvapp

Step 2:
Add Styles
npm install --save superagent
Call our API

Within Xcode, open Info.plist and add a new key, by right clicking inside the editor and selecting Add Row. Use NSLocationWhenInUseUsageDescription as the key name and use the following value:


Step 3
var Request = require('superagent');

 Request
      .get('http://uvapi.herokuapp.com/forecast/longitude=2,17&latitude=41,38')
      .set('Accept', 'application/json')
      .end(function(err, res){
        // Calling the end function will send the request
          console.log(res);
      });
