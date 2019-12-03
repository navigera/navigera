import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { getGrid } from "./grid";
const GRIDHEIGHT = 43;
const GRIDWIDTH = 78;

export default class SelfServeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      plRow: 0,
      plCol: 0,
      rowSize: 0,
      colSize: 0
    };
    this.input =
      "O(4) X(28) O(4) X(20) X(22)\nO(4) 1(1-28) O(4) 1(29-48) X(22)\nO(4) 2(23-1) O(20) 3(1-9) X(22)\nO(4) X(23) O(20) X(31)\nO(4) X(23) O(20) X(31)\nO(4) 4(23-1) O(20) 5(1-31)\nO(4) 6(23-1) O(20) 7(1-25) O(3) 7(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 8(23-1) O(20) 9(1-25) O(3) 9(29-31)\nO(4) 10(23-1) O(20) 11(1-25) O(3) 11(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 12(23-1) O(20) 13(1-25) O(3) 13(29-31)\nO(4) 14(23-1) O(20) 15(1-25) O(3) 15(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 16(23-1) O(20) 17(1-25) O(3) 17(29-31)\nO(4) 18(23-1) O(20) 19(1-25) O(3) 19(29-31)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) X(23) O(20) X(25) O(3) X(3)\nO(4) 20(23-1) O(20) 21(1-25) O(3) 21(29-31)\nO(4) 22(23-1) O(10) 23(1-35) O(3) 23(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 24(23-1) O(10) 25(1-35) O(3) 25(39-41)\nO(4) 26(23-1) O(10) 27(1-35) O(3) 27(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 28(23-1) O(10) 29(1-35) O(3) 29(39-41)\nO(4) 30(23-1) O(10) 31(1-35) O(3) 31(39-41)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) X(23) O(10) X(35) O(3) X(3)\nO(4) 32(23-1) O(10) 33(1-35) O(3) 33(39-41)\nO(4) 34(20-1) O(22) 35(1-32)\nO(4) X(20) O(22) X(32)\nO(4) X(20) O(22) X(32)\nO(4) 36(20-1) O(22) 37(1-32)\nO(52) 39(1-26)\nO(52) X(26)\nO(52) X(26)\nO(52) 41(1-26)\nO(72) 43(1-6)";
    this.grid = [];

    this.mutatePosition = this.changePosition.bind(this);
    this.mutateImage = this.mutateImage.bind(this);
  }

  componentDidMount() {
    let grid = getGrid(this.input);
    this.grid = grid;
  }

  findPosition(aisle, shelf) {
    let row = this.findRow(aisle);
    let col = this.findCol(row, aisle, shelf);

    if (row !== -1 && col !== -1) return { row: row, col: col };

    return undefined;
  }

  findRow(aisle) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].isles.length; j++) {
        if (this.grid[i].isles[j] == aisle) return i;
      }
    }
    //if aisle is not found.
    return -1;
  }

  findCol(row, aisle, shelf) {
    if (row === -1) return -1;
    for (let i = 0; i < this.grid[row].data.length; i++) {
      let current = this.grid[row].data[i];
      if (current.isle == aisle && current.shelf == shelf) {
        return i;
      }
    }
    //if shelf is not found on row.
    return -1;
  }

  changePosition(aisle, shelf) {
    let pos = this.findPosition(aisle, shelf);
    if (pos !== undefined) this.setState({ plRow: pos.row, plCol: pos.col });
  }

  //If change in carousel causes re-rendering of imagebackground, recalculate everything
  mutateImage(width, height) {
    this.setState({
      imageHeight: height,
      imageWidth: width,
      rowSize: height / GRIDHEIGHT,
      colSize: width / GRIDWIDTH
    });
  }

  render() {
    return (
        <ImageBackground
          onLayout={event => {
            this.mutateImage(
              event.nativeEvent.layout.width,
              event.nativeEvent.layout.height
            );
          }}
          source={{ uri: "https://lord.lol/files/floorplan.png" }}
          style={styles.backgroundImage}
          resizeMode="stretch"
          resizeMethod="scale"
        >
          <PackageLocation
            onPress={() => {
              this.changePosition(1, 29);
            }}
            row={this.state.plRow}
            col={this.state.plCol}
            width={this.state.colSize}
            height={this.state.rowSize}
          />
        </ImageBackground>
    );
  }
}

class PackageLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rowpos = this.props.row * this.props.height;
    const colpos = this.props.col * this.props.width;

    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
          width: this.props.width * 2,
          height: this.props.height,
          backgroundColor: "yellow",
          top: rowpos,
          left: colpos
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    opacity: 1,
    justifyContent: "flex-start",
    alignSelf: "flex-start"
  }
});
