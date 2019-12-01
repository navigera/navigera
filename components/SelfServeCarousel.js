import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import SelfServeCarouselEntryItem from "./SelfServeCarouselEntryItem";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class SelfServeCarousel extends Component {
  constructor() {
    super();
    this.state = {
      activeSlide: 0
    };
  }

  _renderItem({ item, index }) {
    const { setPickedCallback } = this.props;
    if (item) {
      return (
        <SelfServeCarouselEntryItem
          setPickedCallback={setPickedCallback}
          item={item}
        />
      );
    } else {
      return <></>;
    }
  }

  render() {
    const { entries } = this.props;

    console.log("SelfServeCarousel entries: ", entries);
    const sliderWidth = viewportWidth;
    const itemWidth = sliderWidth - 30 * 2;

    if (entries) {
      return (
        <View style={styles.carouselContainer}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={entries}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={"default"}
            style={styles.carouselStyle}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      );
    } else {
      return <></>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  carouselContainer: {},
  carouselStyle: {},
  carouselItemStyle: {
    backgroundColor: "green",
    padding: 10
  }
});
