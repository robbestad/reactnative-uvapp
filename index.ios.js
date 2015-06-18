'use strict';

var React = require('react-native');

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
      latitude: 0
    }
  },

  fetchCoordinates(){
    var that = this;

    function success(pos){
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
        </View>
      </View>
    );
  }
});

AppRegistry.registerComponent('uvapp', () => uvapp);
