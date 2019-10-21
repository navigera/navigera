import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import ProductListItemInfo from "./ProductListItemInfo.js"
import PackageListItem from "./PackageListItem.js"

export default class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
        expanded: false
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
    this.props.removeCallback(this.props.product.key)
  }

  render(){
    return(
      <TouchableHighlight onPress={this.handlePress} onLongPress={this.handleHold}>
        <View style={styles.container}>
          <ProductListItemInfo color={this.props.product.product_info.color} price={this.props.product.availability.price}></ProductListItemInfo>
          {this.state.expanded == true &&
            <View style={styles.flex}>
              {this.props.product.packages.map(p => {
                //todo: generate unique keys
                return <PackageListItem key={p.id} name={p.id + " " + p.count}></PackageListItem>
              })}
            </View>
          }
        </View>
      </TouchableHighlight>

    );
  }
}

const Packages = () => [
];

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'yellow',
    marginBottom: 5,
    marginTop: 5,
  },

  flex:{
    flex: 1,
  }
});
