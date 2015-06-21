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
  requireNativeComponent,
  } = React;
//var {
//  ForecastArc
//  } = require('NativeModules');
//
var ForecastArc = requireNativeComponent('ForecastArc', null);
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
      forecast: 0.001,
      forecastColor: 'red',
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
      fontColor: '#333333',
      background: styles.gray,
      textColor: styles.textBlack,
      description: AdviseLow,
      advice: 'Harmless',
      apiData: {
        result: {
          created: "", time: "", type: "",
          coordinates: [0, 0], forecast: {
            forecast: 1, clear_skies_index: "", partly_cloudy_index: "",
            cloud_cover_parts_of_8: "", ozon_kg: "",
            snowcover_percentage: "", albedo_percentage: "",
            solar_zenith_angle: ""
          }
        }
      }
    }
  },
  fetchAPIData(long, lat){
    var that = this;
    long = long || this.state.longitude.toString().replace(".", ",");
    lat = lat || this.state.latitude.toString().replace(".", ",");
    Request
      .get('http://uvapi.herokuapp.com/forecast/longitude=' + long + '&latitude=' + lat)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) console.log(err);
        if (res) {
          var result = JSON.parse(res.text);
          var uvresults = result.result.length ? result.result[0] : result.result;
          var background = styles.green;
          var fontColor = '#333333';
          var description = AdviseLow;
          var advice = 'Harmless';
          var color = 'red';
          var parasol = {opacity: 0.5};
          var jumper = {opacity: 0.5};
          var cap = {opacity: 0.5};
          var sunglasses = {opacity: 0.5};
          if (uvresults.forecast.forecast > 3) {
            background = styles.yellow;
            description = AdviseModerate;
            advice = 'Moderate';
            color = "yellow";
          }
          if (uvresults.forecast.forecast > 5) {
            background = styles.orange;
            description = AdviseHigh;
            advice = 'High';
            color = "orange";
            parasol = {opacity: 0.5};
            jumper = {opacity: 0.5};
            cap = {opacity: 1};
            sunglasses = {opacity: 1};
          }
          if (uvresults.forecast.forecast > 7) {
            background = styles.red;
            fontColor = '#eeeeee';
            description = AdviseVeryHigh;
            advice = 'Very High';
            color = "red";
            parasol = {opacity: 0.5};
            jumper = {opacity: 1};
            cap = {opacity: 1};
            sunglasses = {opacity: 1};
          }
          if (uvresults.forecast.forecast > 9) {
            background = styles.purple;
            fontColor = '#eeeeee';
            description = AdviseExtreme;
            advice = 'Extreme';
            color = "purple";
            parasol = {opacity: 1};
            jumper = {opacity: 1};
            cap = {opacity: 1};
            sunglasses = {opacity: 1};
          }
          that.setState({
            loading: false,
            apiData: result,
            forecastColor: color,
            background: background,
            fontColor: fontColor,
            description: description,
            advice: advice,
            icons: {parasol, jumper, cap, sunglasses}
          });
        }
      });
  },
  shouldComponentUpdate(nextProps, nextState){
    return (!(JSON.stringify(nextState) === JSON.stringify(this.state)));
  },
  componentWillUpdate(nextProps, nextState){
    if (nextState.longitude !== 0) {
      var long = nextState.longitude;//22;
      var lat = nextState.latitude;//34;
      this.fetchAPIData(long, lat);
      this.reverseGeoCoding(long, lat);
    }
  },
  reverseGeoCoding(long, lat){
    var that = this;
    long = long || this.state.longitude.toString().replace(".", ",");
    lat = lat || this.state.latitude.toString().replace(".", ",");
    var geocodingAPI = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat +
      ',' + long + '&key=' + GOOGLE_API_KEY;
    Request
      .get(geocodingAPI)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if (err) {
          console.warn(err);
        }
        if (res) {
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
  setTestData(){
    // Dummy data for testing
    this.setState({
      loading: false,
      apiData: {
        result: {
          forecast: {
            forecast: 5
          }
        }
      },
      forecastColor: "red",
      background: styles.green,
      fontColor: "#443344",
      description: AdviseModerate,
      advice: "BE CAREFUL"
    })
  },
  render: function () {
    if (this.state.loading) {
      return (
        <View style={[styles.gray, {height: 568}]}>
          <Text style={{textAlign: 'center',
                color: this.state.fontColor,
                fontWeight:900,
                marginTop:100}}>
            UV App is fetching your position
          </Text>
          <Text style={{textAlign: 'center',
                color: this.state.fontColor,
                margin:10}}>
            If you have barred geolocation
            access for this app, please go to your
            system settings and allow access.
          </Text>
          <ActivityIndicatorIOS
            style={[styles.centering, {marginTop: 100}]}
            color="white"
            size="large"
            />
        </View>);
    }
    return (
      <View style={this.state.background}>
        <View style={styles.container}>
          <View style={{height: 100, width:300}}>
            <ForecastArc style={{height: 300, width:300}}
                         forecastValue={this.state.apiData.result.forecast.forecast}
                         color={this.state.forecastColor}
              />
          </View>

          <Text style={{textAlign: 'center',
                        color: this.state.fontColor,
                        fontSize: this.state.fontSize,
                        shadowColor: '#333333',
                        margin: 20}}>
            {this.state.location}
          </Text>

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
                        textAlign:'center',
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