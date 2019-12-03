import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import DescriptionBox from "./DescriptionBox";
import { GetProduct, formatSingleUnit } from "../utilities";
import PrimaryButton from "./PrimaryButton";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Icon } from "@up-shared/components";

export default class SelfServeCarouselEntryItem extends Component {
  constructor() {
    super();
    this.handleHold = this.handleHold.bind(this);
  }

  state = {
    id: null,
    data: null
  };

  componentDidUpdate() {
    console.log("updated");
    if (this.state.id && !this.state.data) {
      console.log("getting data for item with id " + this.state.id);
      GetProduct(this.state.id).then(result => {
        this.setState({
          data: result
        });
        console.log(
          "Updated SelfServeCarouselEntryItem with id " + this.state.id
        );
      });
    }
  }

  handlePress() {}

  handleHold() {
    console.log("Hold lmao, setting isPicked");
    const { setPickedCallback } = this.props;
    setPickedCallback(this.state.id);
  }

  render() {
    const { item } = this.props;

    if (!this.state.id) {
      this.setState({
        id: item.id
      });
    }

    console.log("CAROUSEL ITEM", item);

    if (this.state.data) {
      return (
        <TouchableHighlight underlayColor={"#0058a3"} onLongPress={this.handleHold}>
          <View style={styles.container}>
            <View style={styles.leftGrid}>
              {/*<Image
            style={styles.image}
            source={{ uri: this.state.data.product_info.image_url }}
          /> */}

              <DescriptionBox product={this.state.data}></DescriptionBox>

              <View style={styles.productIDBox}>
                <Text style={styles.productIDText}>{item.id}</Text>
              </View>

              <View style={styles.productNumbers}>
                <View style={styles.shelfBox}>
                  <Text style={styles.productIDText}>
                    {formatSingleUnit(this.state.data.availability.aisle)}
                  </Text>
                </View>
                <Text style={styles.h3}>Aisle</Text>

                <View style={styles.shelfBox}>
                  <Text style={styles.productIDText}>
                    {formatSingleUnit(this.state.data.availability.shelf)}
                  </Text>
                </View>
                <Text style={styles.h3}>Shelf</Text>
              </View>
            </View>

            <View style={styles.rightGrid}>
              <View style={styles.amount}>
                <Text style={styles.amountText}>x {item.amount}</Text>
              </View>
              <View style={styles.btn}>
                <PrimaryButton
                  color="green"
                  icon="check"
                  img=""
                  text={""}
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
          <Icon style={styles.checkIcon} name="check" size={60} color="white"></Icon>
            </View>
          </View>
        </TouchableHighlight>
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
  btn: {
    width: 40,
    marginTop: "55%",
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
    backgroundColor: "green",
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
    width: "50%"
  },
  rightGrid: {
    width: "50%",
    alignContent: "center"
  },
  descriptionBox: {
    flexDirection: "column"
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
    fontSize: 16,
    width: "35%",
    color: "black",
    textAlign: "left"
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
