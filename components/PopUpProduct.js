import React, { Component } from 'react';
import { TouchableHighlight, Text, Image, StyleSheet, View } from 'react-native';
import InputSpinner from './InputSpinner';
import Popover from 'react-native-popover-view';
import { Icon } from "@up-shared/components";
import PrimaryButton from "./PrimaryButton";
import ShelfLocationBox from "./ShelfLocationBox";
import { numberWithSpaces, capitalizeFirst, globalStyles } from '../utilities.js';



export default class PopUpProduct extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
    this.handleSpinnerChange = this.handleSpinnerChange.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }
  state = {
    isVisible: false,
    amount: 1,
    item: null,
    addItemPopup:false
  }

  showPopover(item, addItemPopup) {
    if(addItemPopup){
    this.setState({ 
      isVisible: true, 
      amount: 1, 
      item: item,
      addItemPopup: true });
    }
    else{
      this.setState({ isVisible: true, 
        item: item,
        amount: item.amount,
        addItemPopup: false });
    }
  }

  closePopover() {
    const { modalCloseCallback } = this.props;
    this.setState({ isVisible: false });
    modalCloseCallback();
  }
  
  handlePress() {
      const { btnCallback } = this.props;
      
      if(this.state.addItemPopup){
        btnCallback(this.state.item, this.state.amount);
      }
      else{
        btnCallback(this.state.item.product_info.id, this.state.amount);
      }
    this.closePopover();
  }
  
  handleSpinnerChange(value) {
    if(!this.state.addItemPopup){
      const product = this.state.item;
      product.amount = value;
    }
    this.setState({
      amount: value,
    });
  }
  getProductIDBox(item) {
    return (
      <View style={styles.productIDBox}>
        <Text style={[styles.productIDText, globalStyles.bold]}>{item.product_info.id}</Text>
      </View>);
  }

  

  getProductInformation(item) {
    if (!item.combo_product) {
      return (
        <View style={styles.productNumbers}>
          {this.getProductIDBox(item)}
          <ShelfLocationBox locationNumber={item.availability.aisle} locationText={"Aisle"}></ShelfLocationBox>
          <ShelfLocationBox locationNumber={item.availability.shelf} locationText={"Shelf"}></ShelfLocationBox>
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
    return (
      <View style={styles.content}>

        <TouchableHighlight style={styles.iconContainer} onPress={this.closePopover} underlayColor={"white"} >
          <Icon name="cross" size={30} color="black" />
        </TouchableHighlight>

        <View style={styles.imageBox}>
          <Image style={styles.image} source={{ uri: (item.product_info.image_url) }} />
        </View>
        <Text style={[styles.h1, globalStyles.bold]}>{item.product_info.family.toUpperCase()}</Text>

        <Text style={styles.h3}>
          {capitalizeFirst(item.product_info.category)}, {item.product_info.color}
        </Text>

        <Text style={[styles.h1, globalStyles.bold]}>{numberWithSpaces(item.availability.price)} kr</Text>


        {this.getProductInformation(item)}

        <Text />

        <View style={styles.productNumbers}>
          <Text style={styles.h6}> Amount </Text>
          <InputSpinner handleSpinnerChange={this.handleSpinnerChange} amount={this.state.amount}></InputSpinner>
        </View>
      </View>);
  }

  getButton(){
    let btnText = "Add to shopping list";
    let btnIcon = "buy-online-add";   

    if(!this.state.addItemPopup){
      btnText = "Remove all";
      btnIcon = ""; 
    }
    return(
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={this.handlePress} color="#0058a3" icon={btnIcon} img="" text={btnText}></PrimaryButton>
      </View>
    );
  }

  render() {
    const { item } = this.state;
    

    if(item){
      return (
        <Popover
          isVisible={this.state.isVisible}
          fromView={this.touchable}
          onRequestClose={() => this.closePopover()}>
  
          <View style={styles.container}>
  
            {this.getProductInfo(item)}
  
            {this.getButton()}
          </View>
        </Popover>
      );
    }else{
      return <View></View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 10,
  },
  h1: {
    fontSize: 25,
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
  iconContainer: {
    height: 15,
    width: 30,
    justifyContent: "space-around",
    alignSelf: "flex-end",
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
  productNumbers: {
    width: 280,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
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
  }
});
