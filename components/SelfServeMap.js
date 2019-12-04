import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import ImageMapper from "react-native-image-mapper";
import { getMarkerPosition } from "../utilities";

const window = Dimensions.get("window");

export default class SelfServeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      imageWidth: 0,
      imageHeight: 0,
      plRow: 0,
      plCol: 0,
      rowSize: 0,
      colSize: 0
    };

    this.onAnyAreaPress = this.onAnyAreaPress.bind(this);
  }

  componentDidMount() {
    const { packagePositions } = this.props;
    var promises = [];

    packagePositions.forEach(pos => {
      promises.push(getMarkerPosition(pos.aisle, pos.shelf));
    });

    Promise.all(promises).then(items => {
      var mapping = [];

      items.forEach(pos => {
        mapping.push({
          id: mapping.length,
          name: "random sumtin " + mapping.length,
          shape: "rectangle",
          x1: pos.x,
          y1: pos.y,
          width: 10,
          height: 10,
          prefill: "yellow",
          fill: "red"
        });

        console.log("add marker at x: " + pos.x + " y: " + pos.y);
      });

      console.log("setting state, markers: " + JSON.stringify(mapping));

      this.setState({
        markers: mapping
      });
    });
  }

  getMarkers(aisleNo, shelfNo) {
    return (
      <MapMarker
        isActive={true}
        inGray={true}
        aisleNo={aisleNo}
        shelfNo={shelfNo}
      />
    );
  }

  onAnyAreaPress(item, idx, event) {
    console.log(item);
  }

  render() {
    const imageSource = { uri: "https://lord.lol/files/floorplan.png" };

    console.log("render markers: " + this.state.markers);
    return (
        <ImageMapper
          imgHeight={600}
          imgWidth={window.width}
          imgSource={imageSource}
          imgMap={this.state.markers}
          onPress={(item, idx, event) => {
            console.log("test");
          }}
          containerStyle={styles.backgroundImage}
          selectedAreaId="my_area_id"
        />
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
