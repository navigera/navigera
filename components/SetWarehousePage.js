import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity
} from "react-native";
import { Icon } from "@up-shared/components";
import { globalStyles } from "../utilities";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import SettingsHeader from "./SettingsHeader.js";
import { Stores } from "../assets/stores";
import PrimaryButton from "./PrimaryButton";

var stores = [];

export default class SetWarehousePage extends Component {
  constructor(props) {
    super(props);

    this.setWarehouseClosed = this.setWarehouseClosed.bind(this);
    this.onPressMarker = this.onPressMarker.bind(this);
    this.updateWarehouse = this.updateWarehouse.bind(this);
    this.unSelectMarker = this.unSelectMarker.bind(this);
    this.copyObject = this.copyObject.bind(this);
    this.assignState = this.assignState.bind(this);

    stores = Stores;

    this.state = {
      chosenWarehouse: this.props.screenProps.chosenWarehouse,
      selectedMarker: null,
      ableToUpdate: true,
      showInfo: false
    };

    console.log("chosen warehouse:", this.state.chosenWarehouse);
  }

  setWarehouseClosed() {
    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.setWarehouseClosed
    );
    this.assignState();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  assignState() {
    stores.map(marker => {
      if (
        JSON.stringify(this.state.chosenWarehouse) === JSON.stringify(marker)
      ) {
        marker.isActive = true;
        this.setState({ chosenWarehouse: marker });
      }
    });
  }

  copyObject(src) {
    return Object.assign({}, src);
  }

  onPressMarker(e, index) {
    var same = false;
    stores.map(marker => {
      if (index === marker.id) {
        if (index === this.state.chosenWarehouse.id) {
          same = true;
        }
        var selMarker = this.copyObject(marker);
        this.setState({ selectedMarker: selMarker, ableToUpdate: same });
      }
    });
    this.setState({ showInfo: true });
  }

  updateWarehouse() {
    var cur;
    stores.map(marker => {
      if (this.state.selectedMarker.id === marker.id) {
        marker.isActive = true;
        cur = this.copyObject(marker);
      }
      if (this.state.chosenWarehouse.id === marker.id) {
        marker.isActive = false;
      }
    });
    this.setState({
      chosenWarehouse: cur,
      ableToUpdate: true,
      showInfo: false
    });
    console.log(" new chosenWarehouse", this.state.chosenWarehouse);
    this.unSelectMarker();
    this.props.screenProps.updateWarehouse(cur);
  }

  unSelectMarker() {
    for (var val in this.state.selectedMarker) {
      this.state.selectedMarker[val] = null;
    }
  }

  renderMap() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 61.383105,
          longitude: 15.085107,
          latitudeDelta: 12.0,
          longitudeDelta: 12.0
        }}
      >
        {stores.map(marker => {
          return (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.name}
              key={`${marker.id}-${marker.isActive ? "active" : "inactive"}`}
              pinColor={marker.isActive == true ? "yellow" : "#0058a3"}
              onPress={e => this.onPressMarker(e, marker.id)}
            />
          );
        })}
      </MapView>
    );
  }

  renderInfoBox() {
    return (
      <View style={styles.infoContainer}>
        <Text style={[styles.infoTitleText, globalStyles.regular]}>
          {" "}
          {this.state.showInfo
            ? "IKEA " + this.state.selectedMarker.name
            : "IKEA " +
              (this.state.chosenWarehouse
                ? this.state.chosenWarehouse.name
                : "")}{" "}
        </Text>
        <Text style={[styles.infoText, globalStyles.regular]}>
          {" "}
          {this.state.showInfo
            ? this.state.selectedMarker.address
            : this.state.chosenWarehouse
            ? this.state.chosenWarehouse.address
            : ""}{" "}
        </Text>
        {this.state.selectedMarker ||
        (this.state.selectedMarker &&
          this.state.selectedMarker.id != this.state.chosenWarehouse.id) ? (
          <PrimaryButton
            text={"Select " + this.state.selectedMarker.name}
            onPress={this.updateWarehouse}
            color={this.state.ableToUpdate == true ? "#b8b8b6" : "#0058a3"}
            disabled={this.state.ableToUpdate}
          />
        ) : (
          <></>
        )}
        <Text style={[styles.currentWarehouseText, globalStyles.regular]}>
          Current warehouse: {this.state.chosenWarehouse.name}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsHeader
          titleText={"Warehouse location"}
          method={this.setWarehouseClosed}
        />

        <View style={styles.container}>
          <View style={styles.mapContainer}>{this.renderMap()}</View>
          {this.renderInfoBox()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  mapContainer: {
    // height: 440,
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  infoContainer: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  infoTitleText: {
    color: "black",
    fontSize: 18,
    marginTop: 10,
    marginLeft: 60,
    width: "100%"
  },
  infoText: {
    color: "grey",
    fontSize: 14,
    marginLeft: 60,
    width: "100%",
    marginBottom: 10
  },
  updateButton: {
    height: 40,
    width: 350,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  updateText: {
    color: "white",
    fontSize: 17
  },
  currentWarehouseText: {
    color: "grey",
    fontSize: 14,
    marginTop: 10
  }
});
