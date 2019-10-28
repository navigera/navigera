import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import ProductListItem from "./ProductListItem.js"

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
                //    console.log(responseJson);
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
    return(

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container, styles.padding}>
          {this.props.screenProps.products.map(p => {
            return <ProductListItem product={p} removeCallback={this.props.screenProps.removeItemCallback} key={p.key}/>
          })}
        </ScrollView>
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
  },

  padding:{
    padding: 20,
  },

  image:{
    width: 300,
    height: 300
  }
});
