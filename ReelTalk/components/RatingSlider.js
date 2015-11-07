// TODO break into components
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
} = React;

var RatingSlider = React.createClass({
  getInitialState: function() {
  	return {
  		text: this.props.defaultText,
      bucketWidth: null,
  	};
	},

  _setBucketWidth: function(bucketWidth) {
    this.setState({
      text: this.state.text,
      bucketWidth: bucketWidth,
    });
  },

  _setText: function(text) {
    this.setState({
      text: text,
      bucketWidth: this.state.bucketWidth,
    });
  },

  // Specifies the type prop must be
  propTypes: {
    style: View.propTypes.style,
  },

  // TODO: is there a way to do it without storing width in the state?
  _onLayout: function(evt) {
    var numOptions = this.props.options.length;
    var width = evt.nativeEvent.layout.width;

    var bucketWidth = width / numOptions;
    this._setBucketWidth(bucketWidth);
  },

  _alterRating: function(locationX) {
    // We take the floor since index starts at 0
    var bucketIndex = Math.floor(locationX / this.state.bucketWidth);
    var text = this.props.options[bucketIndex];
    this._setText(text);
  },

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this._alterRating(evt.nativeEvent.locationX)
      },

      onPanResponderMove: (evt, gestureState) => {
        this._alterRating(evt.nativeEvent.locationX)
      },

      onPanResponderRelease: (evt, gestureState) => {
        // TODO: send the final rating to the db
      }
    })
  },

// what if I just had x amount of boxes then justified them and made the color change depending on where you are relative to those boxes/
// then I wouldnt need to worry about what the width size was
  render: function() {
    return (
      <View style={[styles.ratingSlider, this.props.style]} onLayout={this._onLayout} {...this._panResponder.panHandlers}>
        <Text style={styles.sliderText}>{this.state.text}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  ratingSlider: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1,
  },
  sliderText: {
    fontSize: 17,
    fontWeight: '300'
  },
});

module.exports = RatingSlider;
