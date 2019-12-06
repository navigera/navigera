import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from "react-native";
import ImageMapper from "react-native-image-mapper";
import { getMarkerPosition } from "../utilities";
import { ScrollView } from "react-native-gesture-handler";

const window = Dimensions.get("window");

export default class SelfServeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
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
          shape: "circle",
          x1: pos.x,
          y1: pos.y,
          radius: 10,
          prefill: "yellow",
          fill: "red"
        });
      });

      this.setState({
        markers: mapping
      });
    });
  }

  onAnyAreaPress(item, idx, event) {
    console.log(item);
  }

  render() {
    const imageSource = { uri: "https://lord.lol/files/floorplan.png" };

    console.log("window width: " + window.width);
    console.log("width / 600: " + 600 / window.width);

    return (
      <>
        <ScrollView>
          <ImageMapper
            imgHeight={window.width * 1.4583333333333333}
            imgWidth={window.width}
            imgSource={imageSource}
            imgMap={this.state.markers}
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
