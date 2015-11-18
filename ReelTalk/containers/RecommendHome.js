'use strict';

var React = require('react-native');
var {
  ActionSheetIOS,
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} = React;

var BUTTONS = [
  'Just Me',
  'Group',
  'None',
  'Cancel',
];
var CANCEL_INDEX = 3;

var Billboard = require('./Billboard');
var CreateGroupPage = require('./CreateGroupPage');
var Lolomo = require('./Lolomo');
var json = require("../Data");

var RecommendHome = React.createClass({
  getInitialState: function() {
    return {
      categories: json.categories,
      groupMembers: [json.users[this.props.userId]],
    };
  },

  handleCreateGroup: function(selectedUsers) {
    this.props.navigator.pop();
    this.setState({
      groupMembers: Object.keys(selectedUsers).map(k => selectedUsers[k]),
    });
    // TODO Filter out and set new movies here
  },

  selectGroup: function() {
    this.props.navigator.push({
      title: "Group",
      component: CreateGroupPage,
      props: {onCreateGroup: this.handleCreateGroup},
    })
  },

  showActionSheet: function() {
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
      if (buttonIndex === 0) {
        this.setState({
          groupMembers: [json.users[this.props.userId]],
        });
      }
      if (buttonIndex === 1) {
        this.selectGroup();
      }
    })
  },

  render: function() {
    console.log(this.state.groupMembers);
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard groupMembers={this.state.groupMembers}
            selectGroup={this.selectGroup}
            defaultCategories={this.defaultCategories}
            showActionSheet={this.showActionSheet}/>
        </View>
        <Lolomo
          style={styles.lolomo}
          navigator={this.props.navigator}
          userId={this.props.userId}
          categories={this.state.categories}
        />
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  billboardContainer: {
    marginBottom: 5,
  },
  lolomo: {
    flex: 1,
  },
});

module.exports = RecommendHome;
