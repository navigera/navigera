import React, { Component } from 'react';
import {Text, Image, StyleSheet, View } from 'react-native';
import InputSpinner from './InputSpinner';
import PrimaryButton from './PrimaryButton';
import Popover from 'react-native-popover-view';

export default class PopUpProduct extends Component {
   state = {
     isVisible: false
   }
 
  showPopover() {
    this.setState({isVisible: true});
  }
 
  closePopover() {
    this.setState({isVisible: false});
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

  formatSingleUnit(x){
    return ((x>10) ? x : "0" + x);

  }

onPress(){
  console.log("Do Something");
  this.closePopover();
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
           
            <View style = {styles.imageBox}>
              <Image style={styles.image}source={require('../res/Billy.png')}/>
           </View>
            <Text style={styles.h1}>{item.familyName.toUpperCase()}</Text> 

            <Text style={styles.h3}>
              {item.product_info.category}, {item.product_info.color}
            </Text>

            <Text style={styles.h1}>{this.numberWithSpaces(item.availability.price)} kr</Text>

            <View style={styles.productNumbers}>
              <View style={styles.productIDBox}>
                <Text style={styles.productIDText}>{item.id}</Text>
              </View>

              <View style={styles.shelfBox}>
                <Text style={styles.productIDText}>{this.formatSingleUnit(item.availability.isle)}</Text>
              </View>
              <Text>Isle</Text>
              
              <View style={styles.shelfBox}>
                <Text style={styles.productIDText}>{this.formatSingleUnit(item.availability.shelf)}</Text>
              </View>
              <Text>Shelf</Text>
            
            </View>
            <Text/>

            <View style={styles.productNumbers}>
              <Text style = {styles.h6}> Amount </Text>
              <InputSpinner></InputSpinner>
            </View>

          
            <PrimaryButton style = {styles.productNumbers } onPress={() => this.closePopover()} img ="" text={"Lägg till i listan"}></PrimaryButton>
          </View>
        </Popover> 
      </View>
      );
    }
}

const styles = StyleSheet.create({
    h1:{
      fontSize:25,
      fontWeight:"bold",
    },
  
    h3:{
      fontSize:18,
      fontWeight:"normal",
      color:"gray"
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
    imageBox: {
      alignItems:"center",
      width:"100%",
    },
    image:{
      width: 200,
      height: 200
    },
    modal: {
      margin:20
    },
    productNumbers: {
      width:280,
      flexWrap:"wrap",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems: "center",
      paddingTop:10,
      paddingBottom: 10

    },
    productIDBox: { 
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"black",
      width:100,
      height:30
    },
    productIDText:{
      textAlign:"center",
      color:"white",
      fontWeight: "bold"
    },
    shelfBox: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#cc0008",
      width:30,
      height:30
    }
  });