'use strict';
var React = require('react-native');
var Request = require('superagent');
var GOOGLE_API_KEY = require('./secret/google_api_key');

var {
  AppRegistry,
  StyleSheet,
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
      borderLeftColor: '#ffffff',
      borderRightColor: '#ffffff',
      borderTopColor: '#ffffff',
      fontColor: '#333333',
      background: styles.green,
      textColor: styles.textBlack,
      description: AdviseLow,
      advise: 'Harmless',
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
        var background = styles.green;
        var fontColor = '#333333';
        var description = AdviseLow;
        var advise = 'Harmless';
        var borderLeftColor = '#ffffff';
        var borderRightColor= '#ffffff';
        var borderTopColor= '#ffffff';

        if(result.result.forecast.forecast >3){
          background = styles.purple;
          description = AdviseModerate;
          advise = 'Moderate';
        }
        if(result.result.forecast.forecast >5){
          background = styles.orange;
          description = AdviseHigh;
          advise = 'High';
        }
        if(result.result.forecast.forecast >7){
          background = styles.red;
          fontColor = '#eeeeee';
          description = AdviseVeryHigh;
          advise = 'Very High';
          borderLeftColor = '#FC9EA9';
          borderRightColor= '#FC9EA9';
          borderTopColor= '#FC9EA9';
        }
        if(result.result.forecast.forecast >9){
          background = styles.purple;
          fontColor = '#eeeeee';
          description = AdviseExtreme;
          advise = 'Extreme';
          borderLeftColor = '#C3A4D7';
          borderRightColor= '#C3A4D7';
          borderTopColor= '#C3A4D7';
        }
        that.setState({
          loading: false,
          apiData: result,
          background: background,
          fontColor: fontColor,
          description: description,
          advise: advise,
          borderLeftColor: borderLeftColor,
          borderRightColor: borderRightColor,
          borderTopColor: borderTopColor
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
    Request
      .get(geocodingAPI)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        if(err){
          console.warn(err);
        }
        if(res){
          console.log(res);
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
                        borderLeftWidth: 20,
                        borderRightWidth: 20,
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
                        fontWeight:"900",
                        color:this.state.fontColor}}>
            {this.state.advise}
          </Text>
          <Text style={{fontSize:this.state.fontSize,
                        marginTop:60,
                        marginLeft:20,
                        marginRight:20,
                        color:this.state.fontColor}}>
            {this.state.description}
          </Text>
          <View style={styles.row}>
            <Image source={require('image!sunglasses')} style={styles.sunglasses}/>
            <Image source={require('image!cap')} style={styles.cap}/>
            <Image source={require('image!jumper')} style={styles.jumper}/>
            <Image source={require('image!parasol')} style={styles.parasol}/>
          </View>

        </View>
      </View>
    );
  }
});
AppRegistry.registerComponent('uvapp', () => uvapp);
