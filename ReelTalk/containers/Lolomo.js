'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  View,
} = React;

var json = require("../Data");
var LolomoRow = require('./LolomoRow');
var Billboard = require('./Billboard');
var MovieDetailView = require('./MovieDetailView');

var Lolomo = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(json.categories),
    };
  },

  _showDetails: function(show) {
    this.props.navigator.push({
      title: show.name,
      component: MovieDetailView,
      passProps: {
        initialShow: show,
        navigator: this.props.navigator,
      },
    });
  },

  renderLolomoRow: function(category) {
    return (
      <LolomoRow header={category.name} category={category} onSelect={this._showDetails}/>
    )
  },

  renderBillboard: function() {
    return (
      <Billboard
        userId={this.props.userId}
      />
    )
  },

  render: function() {
    return (
      <ListView
        // TODO: not sure if I like that a header is part of a Lolomo
        renderHeader={this.renderBillboard}
        dataSource={this.state.dataSource}
        renderRow={this.renderLolomoRow}
        style={styles.listView}
        showsVerticalScrollIndicator={false}
      />
    );
  },
});

var styles = StyleSheet.create({
  listView: {
     backgroundColor: 'white',
  },
});

module.exports = Lolomo;