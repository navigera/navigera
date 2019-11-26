import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import ProductListItemInfo from "./ProductListItemInfo.js"
import PackageListItem from "./PackageListItem.js"

export default class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
        expanded: false,
        currentKey : 0,
        packages: [],
    };
    
    this.handlePress = this.handlePress.bind(this);
    this.handleHold = this.handleHold.bind(this);
  }

  handlePress(event){
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleHold(event){
    const {longPressCallback} = this.props;
    longPressCallback(this.props.product);
  }

  componentDidMount(){
    this.props.product.packages.forEach(p => {
      this.fetchPackage(p);
    });


  }
  fetchPackage(p){
    fetch("https://europe-west2-ikea-mau-eu.cloudfunctions.net/api/getProduct/" + p.id)
    .then((response) => response.json())
    .then((responseJson) => {
      var list = this.state.packages;
      p.data = responseJson;
      list.push(p);
      this.setState({packages: list});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    const {longPressCallback} = this.props;
    return(
      <TouchableHighlight underlayColor ={"#fafafa"} onLongPress={this.handleHold}>
        <View style={styles.container}>

          <ProductListItemInfo  expanded={this.state.expanded} handlePress={this.handlePress} product={this.props.product}></ProductListItemInfo>

          {this.state.expanded == true &&
            <View style={styles.flex}>
              {this.state.packages.map((p, index) => {
                //todo: generate unique keys
                return <PackageListItem item = {p.data} key={p.id} amount={p.count * this.props.product.amount} lastItem={(this.state.packages.length === index+1)}></PackageListItem>
              })}
            </View>
          }
        </View>
      </TouchableHighlight>

    );
  }
}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    marginBottom: 5,
    marginTop: 5,
  },

  flex:{
    flex: 1,
  }
});
