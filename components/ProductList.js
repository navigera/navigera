import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import ProductListItem from "./ProductListItem.js"
import ProductListFooter from "./ProductListFooter.js"

export default class ProductList extends Component {
  constructor(props){
    super(props);

    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount(){
		/*this.getProduct("690.178.28");
		this.getProduct("002.638.50");
		this.getProduct("690.178.28");*/
	}

  getProduct(id) {
        fetch("https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" + id)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.key = this.currentKey;
                this.currentKey++;
                var list = this.state.products;
                list.push(responseJson);
                this.setState({ products: list });
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

  render(){
    const products = this.props.screenProps.products;
    let quantity = products.length;
    let totalPrice = 0;
    products.map((item) => {
      totalPrice += item.product.availability.price
    });

    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> My items </Text>
        <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonInterior}>...</Text>
        </TouchableHighlight>
      </View>
        <ScrollView style={styles.container, styles.padding}>
          {this.props.screenProps.products.map(p => {
            return <ProductListItem product={p} removeCallback={this.props.screenProps.removeItemCallback} key={p.product_info.id}/>
          })}
        </ScrollView>
        <ProductListFooter price={totalPrice} quantity={quantity}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
	button: {
    color:"white"
  },

  container:{
    flex: 1,
    backgroundColor:"#f4f4f4"
  },

  padding:{
    padding: 20,
  },

  image:{
    width: 300,
    height: 300
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#0058a3',
    height: 70,
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 15,
  },
  button: {
      backgroundColor: '#0058a3',
      height: 25,
      width: 50,
      paddingBottom: 20,
      paddingTop: 10,
      paddingRight: 80,
      margin: 25,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonInterior: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 45,


  },
});
