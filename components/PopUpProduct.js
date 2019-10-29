import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import InputSpinner from './InputSpinner';
import PrimaryButton from './PrimaryButton';
import Popover from 'react-native-popover-view';

export default class PopUpProduct extends Component {
  constructor(props){
    super(props);

    this.props.navigation.addListener('willBlur', () => {
      this.props.navigation.state.params.modalClosedCallback();
    });

    this.handlePress = this.handlePress.bind(this);
    this.handleSpinnerChange = this.handleSpinnerChange.bind(this);
  }

  state = {
    amount: 1,
    id: ""
  }


  handlePress(){
    this.props.navigation.state.params.addItemCallback(this.props.navigation.state.params.item, this.state.amount);
    this.props.navigation.goBack();
  }

  handleSpinnerChange(value){
    this.setState({
      amount: value,
    });
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

  getProductIDBox(item){
   return(
   <View style={styles.productIDBox}>
    <Text style={styles.productIDText}>{item.product_info.id}</Text>
  </View>);
  }

  getProductInformation(item) {

    if (!item.combo_product) {
      return (
        <View style={styles.productNumbers}>

         {this.getProductIDBox(item)}

          <View style={styles.shelfBox}>
            <Text style={styles.productIDText}>{this.formatSingleUnit(item.availability.aisle)}</Text>
          </View>
          <Text>Aisle</Text>

          <View style={styles.shelfBox}>
            <Text style={styles.productIDText}>{this.formatSingleUnit(item.availability.shelf)}</Text>
          </View>
          <Text>Shelf</Text>
        </View>);

    }
    else {
      return (
        <View style={styles.productNumbers}>
        {this.getProductIDBox(item)}
        </View>
      );
    }
  }

  getProductInfo(item) {
    if (item) {
      //Show product info

      return (
        <View style={styles.content}>
          <View style={styles.imageBox}>
            <Image style={styles.image} source={{uri:(item.product_info.image_url)}} />
          </View>
          <Text style={styles.h1}>{item.product_info.family.toUpperCase()}</Text>

          <Text style={styles.h3}>
            {this.capitalizeFirst(item.product_info.category)}, {item.product_info.color}
          </Text>

          <Text style={styles.h1}>{this.numberWithSpaces(item.availability.price)} kr</Text>


          {this.getProductInformation(item)}

          <Text />

          <View style={styles.productNumbers}>
            <Text style={styles.h6}> Amount </Text>
            <InputSpinner handleSpinnerChange={this.handleSpinnerChange} amount={this.state.amount}></InputSpinner>
          </View>
        </View>);
    } else {
      return (<Text>no tengo produCTO</Text>);
    }
  }

  render() {
    if(this.props.navigation.state.params !== undefined){
      const { item } = this.props.navigation.state.params;

      return (

        <View style={styles.container}>
          {this.getProductInfo(item)}

          <View style={styles.modal}>
            <PrimaryButton style={styles.productNumbers} onPress={this.handlePress} img="" text={"Lägg till i listan"}></PrimaryButton>
          </View>
        </View>
      );
    }
    else {
      return (
        <View/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    backgroundColor: 'white',
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
  },

  h3: {
    fontSize: 18,
    fontWeight: "normal",
    color: "gray"
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
  imageBox: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 200,
    height: 200
  },
  modal: {
    margin: 20
  },
  content: {
    padding: 20,
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
