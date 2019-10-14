import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import ProductListItemInfo from "./ProductListItemInfo.js"
import PackageListItem from "./PackageListItem.js"

export default class ProductList extends Component {

  constructor(props){
    super(props);
    this.state = {
        expanded: false
    };

    this.handleClick = this.handleClick.bind();
  }

  handleClick = (event) => {
    this.setState({
      expanded: !this.state.expanded
    });
  }



  render(){
    return(

      <View style={styles.container}>
      <Text onPress={this.handleClick}>{this.state.expanded ? "expanded" : "not expanded"}</Text>
        <ProductListItemInfo></ProductListItemInfo>
        {this.state.expanded == true &&
          <View style={styles.flex}>
            <PackageListItem></PackageListItem>
            <PackageListItem></PackageListItem>
          </View>
        }
      </View>

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
