import React from "react";
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Vibration
} from "react-native";
import { RNCamera } from "react-native-camera";
import BarcodeMask from "react-native-barcode-mask";
import CONSTANTS from "./components/Constants.js";
import PopUpProduct from "./components/PopUpProduct";
import { GetProduct } from "./utilities.js";
import { withNavigationFocus } from "react-navigation";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.modalClosed = this.modalClosed.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onSwipeDown = this.onSwipeDown.bind(this);
  }

  state = {
    modalVisible: false,
    item: null
  };

  componentDidUpdate(props) {
    if (!this.props.isFocused) {
      this.camera.pausePreview();
    } else {
      this.camera.resumePreview();
    }
  }
  modalClosed() {
    this.setState({ modalVisible: false });
    this.camera.resumePreview();
  }

  onSwipeDown(gestureState) {
    this.openModal();
  }

  openModal() {
    this.camera.pausePreview();
    this.setState({ modalVisible: true });
    this.props.navigation.navigate("Modal", {
      item: this.state.item,
      modalClosedCallback: this.modalClosed,
      addItemCallback: this.props.screenProps.addItemCallback
    });
  }

  renderCamera() {
    var temp;

    return (
      <GestureRecognizer style={styles.container} onSwipeDown={this.onSwipeDown}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={styles.preview}
          cropScanArea={[1, 1]}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          onTextRecognized={async data => {
            if (!this.state.modalVisible) {
              temp = data.textBlocks;

              if (typeof temp !== "undefined") {
                for (let i = 0; i < temp.length; i++) {
                  if (temp[i].value.length == CONSTANTS.SERIAL_LENGTH) {
                    var possibleSerial = temp[i].value;
                    if (CONSTANTS.REGEX.test(possibleSerial)) {
                      let product = await GetProduct(possibleSerial);
                      if (product) {
                        this.camera.pausePreview();
                        this.setState({ item: product });
                        if (!this.state.modalVisible) {
                          Vibration.vibrate(200);
                        }
                        this.modal.showPopover(product, true);
                        this.setState({ modalVisible: true });
                        console.log("camera opened popup");
                      }
                      //Obviously will not alert, but rather send value elsewhere.
                    }
                  }
                }
              }
            }
          }}
        >
          {this.renderMaskAndButton()}
        </RNCamera>
      </GestureRecognizer>
    );
  }

  renderMaskAndButton() {
    const { height, width } = Dimensions.get("window");
    const maskRowHeight = height * 0.1;
    const maskColWidth = width * 0.9;

    return (
      <>
        <BarcodeMask
          width={maskColWidth}
          height={maskRowHeight}
          backgroundColor={"rgba(0,0,0,.4)"}
          edgeBorderWidth={2}
          animatedLineHeight={1}
        />
        <TouchableHighlight
          style={styles.textContainer}
          onPress={this.openModal}
        >
          <Text style={styles.textBox}>Search</Text>
        </TouchableHighlight>
      </>
    );
  }

  render() {
    const { addItemCallback } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <PopUpProduct
          style={styles.modal}
          addItemCallback={addItemCallback}
          modalCloseCallback={this.modalClosed}
          ref={modal => {
            this.modal = modal;
          }}
        ></PopUpProduct>
        {this.renderCamera()}
      </View>
    );
  }
}

export default withNavigationFocus(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottom: {
    flex: 0,
    justifyContent: "flex-end",
    marginBottom: 0
  },
  maskOuter: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  maskInner: {
    width: "90%",
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRadius: 1,
    borderColor: "white",
    borderWidth: 2
  },
  maskFrame: {
    backgroundColor: "rgba(1,1,1,0.7)"
  },
  maskRow: {
    width: "100%"
  },
  maskCenter: { flexDirection: "row" },
  topRight: {
    alignSelf: "flex-end",
    padding: 20,
    marginTop: 0,
    position: "absolute"
  },
  textBox: {
    backgroundColor: "lightgray",
    borderRadius: 30,
    fontSize: 16,
    opacity: 1,
    textAlign: "auto",
    padding: 10,
    paddingLeft: 20,
    textAlignVertical: "center"
  },
  textContainer: {
    position: "absolute",
    top: 0,
    backgroundColor: "transparent",
    width: "100%",
    padding: 20,
    opacity: 1
  }
});
