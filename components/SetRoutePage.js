import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  Picker,
  Switch
} from "react-native";
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import SettingsHeader from "./SettingsHeader.js";

export default class SetRoutePage extends Component {
  constructor(props) {
    super(props);

    this.setRouteClosed = this.setRouteClosed.bind(this);
  }

  setRouteClosed() {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.setRouteClosed
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  renderSwitch(eventHandler) {
    return (
      <Switch
        disabled={true}
        trackColor={{ false: "#b8b8b6", true: "#68ed8c" }}
        thumbColor={"white"}
        value={true}
        style={[
          styles.switch,
          { transform: [{ scaleX: 1.6 }, { scaleY: 1.5 }] }
        ]}
      />
    );
  }

  renderPicker(updateRoute, chosenRoute) {
    return (
      <View style={styles.pickerView}>
        <Picker
          selectedValue={chosenRoute}
          style={styles.picker}
          prompt="Select package order"
          onValueChange={(itemValue, itemIndex) => {
            console.log("updating route to: " + itemValue);
            updateRoute(itemValue);
          }}
        >
          <Picker.Item label="Classic (entrance to exit)" value="classic" />
          <Picker.Item label="Quickest route" value="quickest" />
          <Picker.Item label="Optimized for size" value="volume" />
          <Picker.Item label="Optimized for weight" value="weight" />

        </Picker>
      </View>
    );
  }

  render() {
    const { chosenRoute, updateRoute } = this.props.screenProps;
    console.log("chosen route render ", chosenRoute);

    return (
      <View style={styles.container}>
        <SettingsHeader
          titleText={"Route order"}
          method={this.setRouteClosed}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.subheader}>
            Select which default navigation type you would like. This will
            affect the packages tab, to help you find your way in the self serve
            area.
          </Text>
          {this.renderPicker(updateRoute, chosenRoute)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 10,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },
  subheader: {
    fontSize: 14
  },
  pickerView: {
    marginTop: 20,
    overflow: "hidden",
    borderColor: "gray",
    padding: 5,
    borderWidth: 2,
    borderRadius: 10000
  },
  picker: {
    textAlign: "right"
  },
  pickerItemStyle: {
    textAlign: "right"
  }
});
