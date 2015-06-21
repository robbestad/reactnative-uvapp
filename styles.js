var React = require('react-native');
var fontSize = 16;
var styles = React.StyleSheet.create({
  green: {
    flex: 1,
    backgroundColor: "#00DAAB"
  },
  lightGreen: {
    flex: 1,
    backgroundColor: "#80EDD5"
  },
  purple: {
    flex: 1,
    backgroundColor: "#8649AF"
  },
  lightPurple: {
    flex: 1,
    backgroundColor: "#C3A4D7"
  },
  red: {
    flex: 1,
    backgroundColor: "#F93C53"
  },
  lightRed: {
    flex: 1,
    backgroundColor: "#FC9EA9"
  },
  orange: {
    flex: 1,
    backgroundColor: "#FF851B"
  },
  lightOrange: {
    flex: 1,
    backgroundColor: "#FFC28D"
  },
  yellow: {
    flex: 1,
    backgroundColor: "#FFC300"
  },
  lightYellow: {
    flex: 1,
    backgroundColor: "#FFE180"
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textBlack: {
    textAlign: 'center',
    color: '#333333',
    fontSize: fontSize,
    shadowColor: '#333333',
    margin: 10
  },
  textWhite: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: fontSize,
    shadowColor: '#333333',
    margin: 10
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 60
  }
});
module.exports = styles;