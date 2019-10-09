import React, { Component } from 'react';
import {Text, Image, StyleSheet, View } from 'react-native';
import Popover from 'react-native-popover-view';

export default class ItemDescription2 extends Component {
  state = {
    isVisible: false
  }
 
  showPopover() {
    this.setState({isVisible: true});
  }
 
  closePopover() {
    this.setState({isVisible: false});
  }

  render(){
    const { item } = this.props;

    return (
      <View >
        <Popover
          isVisible={this.state.isVisible}
          fromView={this.touchable}
          onRequestClose={() => this.closePopover()}>
          
          <View style = {styles.modal}>
            <Image style={styles.image}source={require('../res/Billy.png')}/>
            <Text style={styles.h2}>{item.name}</Text> 

            <Text style={styles.h3}>
              {item.type}, 
              {item.color}, 
              {item.width}x
              {item.depth}x
              {item.height}cm
            </Text>

            <Text style={styles.h1}>{item.price} kr</Text>
            <Text style={styles.h5}>{item.priceNoVat} kr exkl. moms</Text>
            <Text/>
            <Text style={styles.h4}>{item.description}</Text>

          </View>
        </Popover> 
      </View>
      );
    }

  


}

const styles = StyleSheet.create({
    h1:{
      fontSize:40,
      fontWeight:"bold",
    },
  
    h2:{
      fontSize:32,
      fontWeight:"bold",
    },
  
    h3:{
      fontSize:20,
      fontWeight:"normal",
    },
  
    h4:{
      fontSize:18,
      fontWeight:"normal",
    },
  
    h5:{
      fontSize:18,
      color:"#666",
      fontWeight:"normal",
    },
  
    image:{
      width: 300,
      height: 300
    },
    modal: {
      margin:20
    }
  
  });