import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableHighlight } from "react-native";
import DescriptionBox from "./DescriptionBox";
import { GetProduct, formatSingleUnit, globalStyles } from "../utilities";
import PrimaryButton from "./PrimaryButton";
import { Icon } from "@up-shared/components";


export default class SelfServeCarouselEntryItem extends Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { item } = this.props;
    const { setPickedCallback } = this.props;
    setPickedCallback(item.id);
  }

  render() {
    const { item } = this.props;

    if (item.data) {
      return (
        <View style={styles.container}>

            <View style={styles.leftGrid}>
              <Text style={styles.amountText}>x {item.amount}</Text>
              <Text style={[styles.h1,globalStyles.bold]}>
                {item.data.product_info.family.toUpperCase()}
              </Text>
              <View style={styles.productIDBox}>
                <Text style={styles.productIDText}>{item.id}</Text>
              </View>

              <View style={styles.productNumbers}>
                <View style={styles.shelfBox}>
                  <Text style={styles.productIDText}>
                    {formatSingleUnit(item.data.availability.aisle)}
                  </Text>
                </View>
                <Text style={styles.h3}>Aisle</Text>

                <View style={styles.shelfBox}>
                  <Text style={styles.productIDText}>
                    {formatSingleUnit(item.data.availability.shelf)}
                  </Text>
                </View>
                <Text style={styles.h3}>Shelf</Text>
              </View>


              
            </View>

            <View style={styles.rightGrid}>
            <DescriptionBox
                carousel={true}
                product={item.data}
              ></DescriptionBox>
              <View style={item.isPicked ? styles.containerEnabled : styles.btn}>
              <PrimaryButton

                color="#0a8a00"
                icon="check"
                img=""
                text={""}
                onPress={this.handlePress}
              ></PrimaryButton>
            </View>
            </View>
            <View
              style={
                !item.isPicked
                  ? styles.containerEnabled
                  : styles.containerDisabled
              }
            >
              <View style={styles.overlay} />
              <Icon
                style={styles.checkIcon}
                name="check"
                size={60}
                color="white"
              ></Icon>
            </View>
          </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{item.id}</Text>
          <Text>{item.amount}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 18,
  },
  btn: {

    width: 40,
    marginTop: 15,
    alignSelf: "flex-end",
    justifyContent: "space-around"
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    marginBottom: 10,
    overflow: "hidden"
  },
  containerEnabled: {
    display: "none"
  },
  containerDisabled: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.6,
    backgroundColor: "#0a8a00"
  },
  checkIcon: {
    borderWidth: 4,
    borderRadius: 9999,
    borderColor: "white"
  },
  collectedText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  },
  leftGrid: {
    alignContent: "center"
  },
  rightGrid: {
    flexDirection: "column",
    width: "50%",
  },
  descriptionBox: {
  },
  image: {
    width: 70,
    height: 70
  },
  amount: {
    alignSelf: "flex-end",
    textAlignVertical: "top",
    justifyContent: "space-around",
    alignItems: "center"
  },
  amountText: {
    fontSize: 18,
    width: "20%",
    color: "black",
    textAlign: "left",
  },
  
  productNumbers: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  productIDBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 70,
    height: 20,
    marginTop: 10
  },
  productIDText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 10
  },
  shelfBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cc0008",
    width: 20,
    height: 20,
    marginRight: 10
  },
  h3: {
    fontSize: 14,
    color: "gray",
    marginRight: 10
  }
});
