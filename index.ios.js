'use strict';
var React = require('react-native');
var Request = require('superagent');
var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
  } = React;
var styles = require("./styles");
var uvapp = React.createClass({
  getInitialState(){
    return {
      longitude: 0,
      latitude: 0,
      apiData: {}
    }
  },
  fetchAPIData(){
    var that = this;
    var long = this.state.longitude.toString().replace(".",",");
    var lat = this.state.latitude.toString().replace(".",",");
    Request
      .get('http://uvapi.herokuapp.com/forecast/longitude='+long+'&latitude='+lat)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        that.setState({
          apiData: res
        })
      });
  },
  componentWillUpdate(nextProps,nextState){
    if(nextState.longitude!==0){
      this.fetchAPIData();
    }
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
      <View style={styles.green}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            UV App
          </Text>

          <Text style={styles.instructions}>
            Your location:
          </Text>
          <Text style={styles.instructions}>
            Long: {this.state.longitude}
          </Text>
          <Text style={styles.instructions}>
            Lat: {this.state.latitude}
          </Text>
          <Text style={styles.instructions}>
            {this.state.apiData}
          </Text>
        </View>
      </View>
    );
  }
});
AppRegistry.registerComponent('uvapp', () => uvapp);
