/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var dotSize = 30;
var dotMargin = 1;
var dotLength = 8;

var views = React.createClass({
  getInitialState: function() {
    var palette = ['#000000', '#dddddd', '#ffaaaa', '#aaffaa', '#aaaaff'];

    return {
      data: this._initialData(),
      palette: palette,
      penIndex: 0,
    };
  },

  _initialData: function() {
    var data = [];

    for (var i = 0; i < dotLength * dotLength; i++) {
      data.push(1);
    }
    return data;
  },

  _onClick: function (x, y) {
    console.log('x=' + x + ' y=' + y);
    var data = this.state.data;
    data[y * dotLength + x] = this.state.penIndex;
    this.setState({data: data});
  },
  render: function() {
    return (
      <View style={styles.container}>
        {this.state.data.map((r, index) => {
          return <TouchableWithoutFeedback onPress={() => {this._onClick(index % dotLength, parseInt(index / dotLength))}}>
                    <View style={{backgroundColor: this.state.palette[r],
                              width:dotSize,
                              height:dotSize,
                              margin:dotMargin}}></View>
                  </TouchableWithoutFeedback>
        })}

        <View style={styles.palette}>
          {this.state.palette.map((r, i) => {
            var size = 30;
            if (i == this.state.penIndex) {
              size = 50;
            }
            return <TouchableWithoutFeedback onPress={() => {this.setState({penIndex: i})}}>
                    <View style={{width: size, height: size, backgroundColor:r, margin:3}}></View>
                   </TouchableWithoutFeedback>
          })}
        </View>

        <View style={{height: 30, width: 50, backgroundColor: '#ffcccc'}}>
          <TouchableWithoutFeedback  onPress={() => {
            this.setState({data: this._initialData()});
          }}>
            <Text>Clear</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>

    );
  }
});

var styles = StyleSheet.create({
  palette: {
    flexDirection: 'row',
    margin: 20,

  },
  container: {
    margin: 30,
    width: (dotSize + dotMargin * 2) * dotLength,
    height: (dotSize + dotMargin * 2) * dotLength,

    flexDirection: 'row',
    flexWrap: 'wrap',

  },
});

AppRegistry.registerComponent('views', () => views);
