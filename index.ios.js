'use strict';
var React = require('react-native');
var Request = require('superagent');
var GOOGLE_API_KEY = require('./secret/google_api_key');

var {
  AppRegistry,
  StyleSheet,
  ActivityIndicatorIOS,
  Text,
  Image,
  NavigatorIOS,
  View,
  } = React;
var getRandomColor = require('./arc');
var styles = require("./styles");

var AdviseLow = "No protection necessary. Stay out and enjoy the sun!";
var AdviseModerate = "Protect yourself with clothes, a sunhat and sunglasses, and consider using sunscreen. It's safe to stay outside for 1-2 hours at a time";
var AdviseHigh = "Avoid the sun when it's at it's highest. Wear clothes, a sunhat and sunglasses, and apply sunscreen to avoid getting burnt.";
var AdviseVeryHigh = "Do not stay in direct sunlight for more than 15 to 30 minutes at a time. Wear clothes, a sunhat and sunglasses, and apply sunscreen to avoid getting burnt.";
var AdviseExtreme = "Stay in the shades and avoid direct sunlight for more than 5 to 15 minutes at a time. Wear clothes, a sunhat and sunglasses, and apply sunscreen to avoid getting burnt.";

var uvapp = React.createClass({
  getInitialState(){
    return {
      loading: true,
      longitude: 0,
      latitude: 0,
      fontSize: 16,
      location: "",
      icons: {
        parasol: {
          opacity: 0.5
        },
        cap: {
          opacity: 0.5
        },
        jumper: {
          opacity: 0.5
        },
        sunglasses: {
          opacity: 0.5
        }
      },
      borderLeftColor: '#ffffff',
      borderRightColor: '#ffffff',
      borderTopColor: '#ffffff',
      fontColor: '#333333',
      background: styles.gray,
      textColor: styles.textBlack,
      description: AdviseLow,
      advice: 'Harmless',
      apiData: {
        result: {
          created: "", time: "", type: "",
          coordinates: [0,0], forecast: {
            forecast: "", clear_skies_index: "", partly_cloudy_index: "",
            cloud_cover_parts_of_8: "", ozon_kg: "",
            snowcover_percentage: "", albedo_percentage: "",
            solar_zenith_angle: ""
          }
        }
      }
    }
  },
  fetchAPIData(long,lat){
    var that = this;
    long = long || this.state.longitude.toString().replace(".",",");
    lat = lat || this.state.latitude.toString().replace(".",",");
    Request
      .get('http://uvapi.herokuapp.com/forecast/longitude='+long+'&latitude='+lat)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if(err) console.log(err);
        if(res){
        var result = JSON.parse(res.text);
        var uvresults = result.result.length ? result.result[0] : result.result;

        var background = styles.green;
        var fontColor = '#333333';
        var description = AdviseLow;
        var advice = 'Harmless';
        var borderLeftColor = '#ffffff';
        var borderRightColor= '#ffffff';
        var borderTopColor= '#ffffff';
        var parasol={opacity:0.5};
        var jumper={opacity:0.5};
        var cap={opacity:0.5};
        var sunglasses={opacity:0.5};

        if(uvresults.forecast.forecast >3){
          background = styles.yellow;
          description = AdviseModerate;
          advice = 'Moderate';
          borderLeftColor = '#FFE180';
          borderRightColor= '#FFE180';
          borderTopColor= '#FFE180';
        }
        if(uvresults.forecast.forecast >5){
          background = styles.orange;
          description = AdviseHigh;
          advice = 'High';
          borderLeftColor = '#FFC28D';
          borderRightColor= '#FFC28D';
          borderTopColor= '#FFC28D';
          parasol={opacity:0.5};
          jumper={opacity:0.5};
          cap={opacity:1};
          sunglasses={opacity:1};
        }
        if(uvresults.forecast.forecast >7){
          background = styles.red;
          fontColor = '#eeeeee';
          description = AdviseVeryHigh;
          advice = 'Very High';
          borderLeftColor = '#FC9EA9';
          borderRightColor= '#FC9EA9';
          borderTopColor= '#FC9EA9';
          parasol={opacity:0.5};
          jumper={opacity:1};
          cap={opacity:1};
          sunglasses={opacity:1};
        }
        if(uvresults.forecast.forecast >9){
          background = styles.purple;
          fontColor = '#eeeeee';
          description = AdviseExtreme;
          advice = 'Extreme';
          borderLeftColor = '#C3A4D7';
          borderRightColor= '#C3A4D7';
          borderTopColor= '#C3A4D7';
          parasol={opacity:1};
          jumper={opacity:1};
          cap={opacity:1};
          sunglasses={opacity:1};
        }
        that.setState({
          loading: false,
          apiData: result,
          background: background,
          fontColor: fontColor,
          description: description,
          advice: advice,
          borderLeftColor: borderLeftColor,
          borderRightColor: borderRightColor,
          borderTopColor: borderTopColor,
          icons:{parasol,jumper,cap,sunglasses}
        });
        }
      });
  },
  shouldComponentUpdate(nextProps,nextState){
    return(!(JSON.stringify(nextState)===JSON.stringify(this.state)));
  },
  componentWillUpdate(nextProps,nextState){
    if(nextState.longitude!==0){
      var long=nextState.longitude;//22;
      var lat=nextState.latitude;//34;
      this.fetchAPIData(long,lat);
      this.reverseGeoCoding(long,lat);
    }
  },
  reverseGeoCoding(long,lat){
    var that = this;
    long = long || this.state.longitude.toString().replace(".",",");
    lat = lat || this.state.latitude.toString().replace(".",",");
    var geocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+GOOGLE_API_KEY;
console.log(geocodingAPI);
    Request
      .get(geocodingAPI)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if(err){
          console.warn(err);
        }
        if(res){
        var result = JSON.parse(res.text);
        var adress1 = result.results[0].formatted_address;
        var adress2 = result.results[1].formatted_address;
        that.setState({
          location: adress2 ? adress2 : adress1
        })
        }
      });
  },
  fetchCoordinates(){
    var that = this;

    function success(pos) {
      var coords = pos.coords;

      // Sahara desert, Africa
      //coords.latitude = 23.416203;
      //coords.longitude = 25.66283;

      // Oblast, Russia
      //coords.latitude = 59;
      //coords.longitude = 42;

      // Oslo, Norway
      //coords.latitude = 59.44;
      //coords.longitude = 9.05;

      // New York, USA
      //coords.latitude = 40.758895;
      //coords.longitude = -73.985131;

      that.setState({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    }
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error, null);
  },
  componentDidMount(){
    this.fetchCoordinates();
  },
  render: function () {
    if(this.state.loading){
      return (
        <View style={[styles.gray, {height: 568}]}>
          <Text style={{textAlign: 'center',
                color: this.state.fontColor,
                marginTop:100}}>
            UV App
          </Text>
          <ActivityIndicatorIOS
            style={[styles.centering, {marginTop: 150}]}
            color="white"
            size="large"
            />
        </View>);
    }
    return (
      <View style={this.state.background}>
        <View style={styles.container}>
          <Text style={{textAlign: 'center',
                        color: this.state.fontColor,
                        fontSize: this.state.fontSize,
                        shadowColor: '#333333',
                        margin: 20}}>
            {this.state.location}
          </Text>
          <View style={{width: 200,
                        height: 110,
                        borderRadius: 10,
                        borderTopLeftRadius: 150,
                        borderTopRightRadius: 150,
                        borderColor: '#ffffff',
                        borderTopWidth: 20,
                        borderLeftWidth: 25,
                        borderRightWidth: 25,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderLeftColor: this.state.borderLeftColor,
                        borderTopColor: this.state.borderTopColor,
                        borderRightColor: this.state.borderRightColor,
                        borderBottomColor: 'transparent',
                        borderBottomWidth: 1,
                        backgroundColor: 'transparent'}} />
          <Text style={{fontSize:28,
                        marginLeft:20,
                        marginRight:20,
                        marginTop: 30,
                        fontWeight:"900",
                        color:this.state.fontColor}}>
            {this.state.advice}
          </Text>
          <Text style={{fontSize:this.state.fontSize,
                        marginTop:30,
                        textAlign:'justify',
                        marginLeft:60,
                        marginRight:60,
                        color:this.state.fontColor}}>
            {this.state.description}
          </Text>
          <View style={styles.row}>
            <Image source={require('image!sunglasses')}
                   style={{width: 43,
                          height: 16,
                          marginRight: 30,
                          opacity: this.state.icons.sunglasses.opacity,
                          marginLeft: 30,
                          marginTop: 20}}/>
            <Image source={require('image!cap')}
                   style={{width: 44,
                           height: 24,
                           opacity: this.state.icons.cap.opacity,
                           marginRight: 40,
                           marginTop: 15}}/>
            <Image source={require('image!jumper')}
                   style={{width: 44,
                           height: 38,
                           opacity: this.state.icons.jumper.opacity,
                           marginRight: 35,
                           marginTop: 10}}/>
            <Image source={require('image!parasol')}
                   style={{width: 36,
                           height: 40,
                           opacity: this.state.icons.parasol.opacity,
                           marginRight: 30,
                           marginTop: 9}}/>
          </View>

        </View>
      </View>
    );
  }
});
AppRegistry.registerComponent('uvapp', () => uvapp);