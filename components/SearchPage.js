import React, { Component } from "react";
import {
  BackHandler,
  ScrollView,
  View,
  StyleSheet
} from "react-native";
import SearchBox from "./SearchBox";
import { GetSearchResult } from "../utilities.js";
import SearchItem from "./SearchItem.js";
import PopUpProduct from "./PopUpProduct";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      products: [],
      modalVisible: false
    };

    this.modalClosed = this.modalClosed.bind(this);
    this.searchTextChanged = this.searchTextChanged.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  modalClosed() {
    this.setState({ modalVisible: false });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackButton() {
    const { params } = this.props.navigation.state;
    params.modalClosedCallback();
    this.props.navigation.goBack();
    return true;
  }

  async searchTextChanged(text) {
    let result = await GetSearchResult(text);
    if (result) {
      let list = [];
      result.map(p => {
        list.push(p);
        this.setState({
          products: list
        });
      });
    }
  }

  handlePress(product) {
    this.modal.showPopover(product,true);
    this.setState({ modalVisible: true });
  }

  getSearchView() {
    const { addItemCallback } = this.props.screenProps;

    return (
      <View style={styles.focusedContainer}>
        <PopUpProduct
          style={styles.modal}
          btnCallback={addItemCallback}
          modalCloseCallback={this.modalClosed}
          ref={modal => {
            this.modal = modal;
          }}
        ></PopUpProduct>
        <SearchBox
          ref={searchBox => (this.searchBox = searchBox)}
          isFocused={this.state.isFocused}
          searchTextChanged={this.searchTextChanged}
        ></SearchBox>

        {this.getProducts()}
      </View>
    );
  }

  getProducts() {
    if (this.state.products.length > 0) {
      return (
        <ScrollView style={[styles.productsContainer, styles.padding]}>
          {this.state.products.map(p => {
            return (
              <SearchItem
                product={p}
                handlePress={this.handlePress}
                key={p.product_info.id}
              />
            );
          })}
        </ScrollView>
      );
    }
  }

  render() {
    return <View style={{ width: "100%" }}>{this.getSearchView()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {},
  focusedContainer: {
    height: "100%",
    backgroundColor: "#f4f4f4"
  },
  contentContainer: {},
  flex: {
    flex: 1
  },
  productsContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  padding: {
    padding: 20
  },
  textContainer: {
    flexDirection: "column",
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    opacity: 0.7
  }
});
