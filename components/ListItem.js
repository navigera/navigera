
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';


export default class ListItem extends Component {
  render() {
    const { item } = this.props;

    return (


        <View style={styles.container,{flex:1}}>


          <Image style={styles.image}source={require('../res/Billy.png')}/>

          <Text style={styles.h2}>{item.name}  </Text>
          <Text style={styles.h3}>{item.type}, {item.color}, {item.width}x{item.depth}x{item.height} cm</Text>
          <Text style={styles.h1}>{item.price} kr</Text>
          <Text style={styles.h5}>{item.priceNoVat} kr exkl. moms</Text>
          <Text/>
          <Text style={styles.h4}>{item.description}</Text>
        </View>


    );
  }

}


const styles = StyleSheet.create({
	button : {
    color:"white"

  },
  h1:{
    fontSize:40,
    fontFamily: "Roboto",
    fontWeight:"bold",
  },
  h2:{
    fontSize:32,
    fontFamily: "Roboto",
    fontWeight:"bold",
  },
  h3:{
    fontSize:20,
    fontFamily: "Roboto",
    fontWeight:"normal",
  },
  h4:{
    fontSize:18,
    fontFamily: "Roboto",
    fontWeight:"normal",
  },
  h5:{
    fontSize:18,
    color:"#666",
    fontFamily: "Roboto",
    fontWeight:"normal",
  },

  container:{
    //margin:40,
    marginTop:10
  },

  image:{
    width: 300,
    height: 300
  }
});
