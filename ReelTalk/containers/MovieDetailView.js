// TODO break into components
'use strict';

import React, {
  AppRegistry,
  Image,
  StyleSheet,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ParallaxView from 'react-native-parallax-view';

import Rating from '../components/Rating';
import RatingSlider from '../components/RatingSlider';
import HeaderScrollView from '../components/HeaderScrollView';
import LolomoRow from './LolomoRow';
import json from '../Data';

export default class MovieDetailView extends React.Component {
  constructor(props) {
    super(props);
  	this.state = {
  		show: props.initialShow,
      scrollEnabled: true,
  	};
	}

  _changeShow(newShow) {
    this.setState({
      show: newShow,
      scrollEnabled: true,
    });
  }

  _getColorStyles() {
    return {
      primaryBackground: {
        backgroundColor: this.state.show.colors.primary
      },
      primaryShadow: {
        shadowColor: this.state.show.colors.primary
      },
      detailFontColor: {
        color: this.state.show.colors.detail
      },
      textFontColor: {
        color: this.state.show.colors.text
      },
      primaryBorderLeftColor: {
        borderLeftColor: this.state.show.colors.primary
      },
    };
  }

  // TODO: not sure about the this.state.show... Do I even need it?
  _setScrollEnabled(scrollEnabled) {
    this.setState({
      show: this.state.show,
      scrollEnabled: scrollEnabled,
    });
  }

  _disableScroll() {
    this._setScrollEnabled(false);
  }

  _enableScroll() {
    this._setScrollEnabled(true);
  }

// TODO: Lists should not be stored within movies, there should be lists containing movies but I want to focus on design now
// TODO: make <RatingSlider style={styles.ratingSlider}/>
  render() {
    return (
      <ParallaxView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={this.state.scrollEnabled}
        backgroundSource={{uri: this.state.show.largePoster}}
        windowHeight={470}
      >
        <View style={styles.content}>
          <View style={[styles.headerLine, this._getColorStyles().primaryBackground]} />
          <View style={styles.header}>
            <Text style={styles.title}>{this.state.show.name}</Text>
            <View style={styles.detail}>
              <Text style={styles.detailText}>{this.state.show.runtime}</Text>
              <Text style={styles.detailText}>{this.state.show.genre}</Text>
              <Text style={styles.detailText}>{this.state.show.year}</Text>
              <Text style={styles.detailText}>{this.state.show.rating}</Text>
            </View>
            <View style={styles.listsContainer}>
              {json.lists.map(list => <Text style={styles.listName}>{list.name}</Text>)}
            </View>
          </View>
          <RatingSlider
            style={styles.ratingSlider}
            defaultText="Slide to rate"
            options={[
              {text: "Terrible", color: "rgba(233, 62, 58, .7)"},
              {text: "Bad", color: "rgba(237, 104, 60, .7)"},
              {text: "Ok", color: "rgba(243, 144, 63, .7)"},
              {text: "Good", color: "rgba(253, 199, 12, .7)"},
              {text: "Fantastic", color: "rgba(255, 243, 12, .7)"}
            ]}
            disableScroll={this._disableScroll}
            enableScroll={this._enableScroll}
          />
          <Text style={styles.description}>{this.state.show.description}</Text>
        </View>
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: '#B6AEA3',
    },
    content: {
      backgroundColor: '#B6AEA3',
    },
    headerLine: {
      height: 3,
    },
    header: {
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 5,
    },
    detail: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    detailText: {
      fontSize: 13,
      fontWeight: '300',
      paddingLeft: 5,
      paddingRight: 5,
    },
    listsContainer: {
      flexDirection: 'row',
    },
    listName: {
      color: '#5583B6',
      fontSize: 13,
      fontWeight: '300',
      paddingLeft: 2,
      paddingRight: 2,
    },
    ratingSlider: {
      height: 79,
      backgroundColor: '#BAB7AE',
    },
    description: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 14,
      fontWeight: '300'
    }
});
