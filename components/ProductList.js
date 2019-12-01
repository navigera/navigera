import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableHighlight
} from "react-native";
import ProductListItem from "./ProductListItem.js";
import ProductListFooter from "./ProductListFooter.js";
import { globalStyles } from "../utilities.js";
import { Icon } from "@up-shared/components";
import PopUpProduct from "./PopUpProduct";
import Video from "react-native-video";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };

    this.modalClosed = this.modalClosed.bind(this);
    this.handleHold = this.handleHold.bind(this);
  }

  handleHold(product) {
    this.setState({ modalVisible: true });
    this.modal.showPopover(product, false);
  }

  modalClosed() {
    this.setState({ modalVisible: false });
  }

  getPopUpProduct() {
    return (
      <PopUpProduct
        style={styles.modal}
        modalCloseCallback={this.modalClosed}
        btnCallback={this.props.screenProps.removeItemCallback}
        ref={modal => {
          this.modal = modal;
        }}
      ></PopUpProduct>
    );
  }

  getHeader() {
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, globalStyles.bold]}>
          Shopping list{" "}
        </Text>
        <TouchableHighlight style={styles.button}>
          <Icon name="three-dots" size={30} color="white"></Icon>
        </TouchableHighlight>
      </View>
    );
  }

  getList() {
    if (
      this.props.screenProps.products &&
      this.props.screenProps.products.length > 0
    ) {
      return (
        <ScrollView style={[styles.padding]}>
          {this.props.screenProps.products.map(p => {
            return (
              <ProductListItem
                product={p}
                longPressCallback={this.handleHold}
                btnCallback={this.props.screenProps.removeItemCallback}
                key={p.product_info.id}
              />
            );
          })}
        </ScrollView>
      );
    } else {
      return (
        <>
          <Video
            source={require("../assets/media/ufo.mp4")} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            repeat={true}
            onBuffer={() => {console.log('buffering')}} // Callback when remote video is buffering
            onError={() => {console.log('error')}}
            resizeMode="contain"
            style={[styles.padding, styles.video]} />

            <Text style={[styles.videoText, globalStyles.regular]}>Your shopping list is empty. Hmm.</Text>
          </>
      );
    }
  }

  render() {
    const products = this.props.screenProps.products;
    let quantity = 0;
    let totalPrice = 0;
    products.map(item => {
      quantity += item.amount;
      totalPrice += item.availability.price * item.amount;
    });

    return (
      <SafeAreaView style={(products.length > 0) ? styles.container : styles.emptyContainer}>
        {this.getPopUpProduct()}
        {this.getHeader()}

        {this.getList()}

        <ProductListFooter price={totalPrice} quantity={quantity} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  padding: {
    padding: 20
  },

  image: {
    width: 300,
    height: 300
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#0058a3",
    height: 70,
    justifyContent: "space-between"
  },
  headerText: {
    color: "white",
    fontSize: 25,
    paddingTop: 20,
    paddingLeft: 15
  },
  button: {
    backgroundColor: "#0058a3",
    height: 25,
    width: 50,
    paddingBottom: 20,
    paddingTop: 10,
    paddingRight: 80,
    margin: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonInterior: {
    color: "white",
    fontWeight: "bold",
    fontSize: 45
  },
  footer: {
    paddingTop: 10,
  },
  video: {
    height: 240,
    width: 240,
    marginTop: '40%',
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center"
  },
  videoText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 30,
  }
});
