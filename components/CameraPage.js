import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class CameraPage extends Component {

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image style={styles.image} source={require('../res/camera.png')}/>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
