import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default class ProductListItemInfo extends Component {
  capitalizeFirst(str){
    return str[0].toUpperCase() + str.slice(1);
  }
   numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  render(){
    const { item } = this.props;
    const{amount} = this.props
    return(
      
      <View style={styles.container}>
        <Image style={styles.image}source={require('../res/Billy.png')}/>
        <View style={styles.descriptionBox}>
          <Text style={styles.h1}>{item.product_info.family.toUpperCase()}</Text> 
          <Text style={styles.h3}>{this.capitalizeFirst(item.product_info.category)}, {item.product_info.color}</Text>
          <Text style={styles.h2}>{this.numberWithSpaces(item.availability.price)} kr</Text>
        </View>

        <View style={styles.amount}>
          <Text style={styles.amountText}>x {amount}</Text>
        </View>
      </View>

    );
  }

}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    flexDirection:"row",
    backgroundColor: 'white',
    padding:10,
    borderStyle:"dotted",
    borderBottomColor:"gray",
    borderBottomWidth:1,
    borderTopEndRadius:5,
    borderTopLeftRadius:5,
  },
  descriptionBox:{
    flexDirection:"column",
  },
  image:{
    width: 70,
    height: 70
  },
  amount: {
    flex:1,
    justifyContent:"center",
    alignItems:"flex-end"
  },
  amountText: {
    fontSize: 14,
    width:"30%",
    color:"gray",
    textAlign: "left",

  },
  h1: {
    fontSize: 18
  },
  h2: {
    fontSize: 16,
  },
  h3: {
    fontSize: 14,
    color:"gray"
  }
});
