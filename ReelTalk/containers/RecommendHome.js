'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} = React;

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
    console.log(Object.keys(selectedUsers).map(k => selectedUsers[k]));
    this.props.navigator.pop();
    this.setState({
      groupMembers: Object.keys(selectedUsers).map(k => selectedUsers[k]),
    });
  },

  selectGroup: function() {
    this.props.navigator.push({
      title: "Group",
      component: CreateGroupPage,
      props: {onCreateGroup: this.handleCreateGroup},
    })
    this.setState({
      currentFilter: "Friends",
      userId: String((parseInt(this.state.userId) % 3) + 1),
    });
    this.amendCategories();
  },

  defaultCategories:function() {
    this.setState({
      categories: json.categories
    });
  },

  reversedDict: function(category) {
      return {name: category.name, shows: category.shows.reverse()}
  },

  amendCategories: function() {
    var updatedCategories = this.state.categories.reverse().map(category => this.reversedDict(category))
    this.setState({
      categories: updatedCategories
    });
  },

  render: function() {
    console.log(this.state.groupMembers);
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <View style={styles.billboardContainer}>
          <Billboard groupMembers={this.state.groupMembers}
            selectGroup={this.selectGroup}
            defaultCategories={this.defaultCategories}/>
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
