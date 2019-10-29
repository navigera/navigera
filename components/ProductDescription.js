import React, { Component } from 'react';
import { ScrollView, Text, Image, StyleSheet, View } from 'react-native';
import InputSpinner from './InputSpinner';
import PrimaryButton from './PrimaryButton';

export default class ProductDescription extends Component {
  state = {
    isVisible: false
  }

  onPress() {
    console.log("Press");
  }
  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  formatSingleUnit(x) {
    return ((x > 10) ? x : "0" + x);

  }

  capitalizeFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  getProductNumbers(){
    return (<View style={styles.productNumbers}>

      <View style={styles.productIDBox}>
        <Text style={styles.productIDText}>{item.product.product_info.id}</Text>
      </View>

      <View style={styles.shelfBox}>
        <Text style={styles.productIDText}>{this.formatSingleUnit(item.product.availability.aisle)}</Text>
      </View>
      <Text>Aisle</Text>
      <View style={styles.shelfBox}>
        <Text style={styles.productIDText}>{this.formatSingleUnit(item.product.availability.shelf)}</Text>
      </View>
      <Text>Shelf</Text>
    </View>);
  }

  render() {
    const { item } = this.props;

    if (item != null) {
      return (

        <ScrollView>
          <View style={styles.modal}>
            <Image style={styles.image} source={require('../res/Billy.png')} />
            <Text style={styles.h2}>{item.product.product_info.family.toUpperCase()}</Text>

            <Text style={styles.h3}>
              {this.capitalizeFirst(item.product.product_info.category)}, {item.product.product_info.color}
            </Text>

            <Text style={styles.h1}>{this.numberWithSpaces(item.product.availability.price)} kr</Text>

            {getProductNumbers()}

            <Text />

            <View style={styles.productNumbers}>
              <Text style={styles.h6}> Antal </Text>
              <InputSpinner></InputSpinner>
            </View>

            <PrimaryButton style={styles.productNumbers} onPress={this.onPress} img="" text={"Lägg till i listan"}></PrimaryButton>

          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <View>
          <Text>Nope</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "bold",
  },

  h2: {
    fontSize: 32,
    fontWeight: "bold",
  },

  h3: {
    fontSize: 20,
    fontWeight: "normal",
  },

  h4: {
    fontSize: 18,
    fontWeight: "normal",
  },

  h5: {
    fontSize: 18,
    color: "#666",
    fontWeight: "normal",
  },

  h6: {
    fontWeight: "bold",
    fontSize: 20

  },

  image: {
    width: 300,
    height: 300
  },
  modal: {
    margin: 20
  },
  productNumbers: {
    width: 280,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10

  },
  productIDBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 100,
    height: 30
  },
  productIDText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },
  shelfBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0008",
    width: 30,
    height: 30
  }
});
