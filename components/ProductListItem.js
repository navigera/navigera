import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import ProductListItemInfo from "./ProductListItemInfo.js";
import PackageListItem from "./PackageListItem.js";
import { GetProduct } from "../utilities.js";

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      currentKey: 0,
      packages: []
    };

    this.handlePress = this.handlePress.bind(this);
    this.handleHold = this.handleHold.bind(this);
  }

  handlePress(event) {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  handleHold(event) {
    const { longPressCallback } = this.props;
    longPressCallback(this.props.product);
  }

  componentDidMount() {
    this.props.product.packages.forEach(p => {
      this.fetchPackage(p);
    });
  }

  async fetchPackage(p) {
    let response = await GetProduct(p.id);
    var list = this.state.packages;
    p.data = response;
    list.push(p);
    this.setState({ packages: list });
  }

  render() {
    const { longPressCallback } = this.props;
    return (
      <TouchableHighlight
        underlayColor={"#fafafa"}
        onLongPress={this.handleHold}
      >
        <View style={styles.container}>
          <ProductListItemInfo
            expanded={this.state.expanded}
            handlePress={this.handlePress}
            product={this.props.product}
          ></ProductListItemInfo>

          {this.state.expanded == true && (
            <View style={styles.flex}>
              {this.state.packages.map((p, index) => {
                //todo: generate unique keys
                return (
                  <PackageListItem
                    item={p.data}
                    key={p.id}
                    amount={p.count * this.props.product.amount}
                    lastItem={this.state.packages.length === index + 1}
                  ></PackageListItem>
                );
              })}
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5,
    marginTop: 5
  },

  flex: {
    flex: 1
  }
});
