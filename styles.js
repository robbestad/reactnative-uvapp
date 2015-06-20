var React = require('react-native');
var getRandomColor = require('./arc');
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
  arc: {
    width: 200,
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
    borderLeftColor: getRandomColor(),
    borderTopColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  row: {flexDirection: 'row', marginLeft: 40, marginRight: 40, marginTop: 60},
  jumper: {width: 44, height: 38, marginRight: 35, marginTop: 10},
  cap: {width: 44, height: 24, marginRight: 40, marginTop: 15},
  parasol: {width: 36, height: 40, marginRight: 30, marginTop: 9},
  sunglasses: {width: 43, height: 16, marginRight: 30, marginLeft: 30, marginTop: 20},
  text: {flex: 1, justifyContent: 'center'},
  title: {fontSize: 11, fontWeight: 'bold'},
  subtitle: {fontSize: 10}
});
module.exports = styles;