'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
var CANCEL_INDEX = 3;

var json = require("../Data");

var Billboard = React.createClass({

  getInitialState: function() {
  	return {
  		currentFilter: 'Just Me',
  	};
	},

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if (buttonIndex != CANCEL_INDEX) {
        this.setState({
          currentFilter: BUTTONS[buttonIndex]
        });
      }
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: json.users[this.props.userId].picture}}
          style={styles.image}
        />
        <Text onPress={this.showActionSheet} style={styles.filterSelect}>{this.state.currentFilter}</Text>
        <View style={styles.line} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center', // center
      height: 190,
    },
    line: {
      marginTop: 10,
      // TODO: this bottom margin should be added in lolomo but I couldnt get it to work there
      marginBottom: 5,
      width: 350,
      height: 1,
      backgroundColor: '#F1F1F1'
    },
    filterSelect: {
      color: '#0066FA',
      fontSize: 18,
      marginTop:15,
    },
    image: {
      marginTop: 15,
      width: 125,
      height: 125,
      borderRadius: 125/2,
    },
});

module.exports = Billboard;