import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import ImageMapper from "react-native-image-mapper";
import { getMarkerPosition } from "../utilities";
import { ScrollView } from "react-native-gesture-handler";

const window = Dimensions.get("window");

export default class SelfServeMap extends Component {
  constructor(props) {
    super(props);

    this.onAnyAreaPress = this.onAnyAreaPress.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
  }

  onAnyAreaPress(item, idx, event) {
    console.log(item);
  }

  getMarkers() {
    const { packages } = this.props;

    var mapping = [];

    if(packages){
      packages.forEach(pkg => {
        if (pkg.data) {
          const position = getMarkerPosition(
            pkg.data.availability.aisle,
            pkg.data.availability.shelf
          );
          console.log("POSITION: ", position);
  
          var prefill = pkg.isPicked ? "green" : "yellow";
  
          mapping.push({
            id: pkg.id,
            name: pkg.data.product_info.family,
            shape: "circle",
            x1: position.x,
            y1: position.y,
            radius: 10,
            prefill: prefill,
            fill: "red"
          });
        }
      });
    }

    return mapping;
  }

  render() {
    const imageSource = { uri: "https://lord.lol/files/floorplan.png" };

    return (
      <>
        <ScrollView>
          <ImageMapper
            imgHeight={window.width * 1.4166666401757135}
            imgWidth={window.width}
            imgSource={imageSource}
            imgMap={this.getMarkers()}
            onPress={(item, idx, event) => {
              console.log("test");
            }}
            containerStyle={styles.backgroundImage}
            selectedAreaId="my_area_id"
          />
          <View style={{ height: window.height / 3 }} />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
