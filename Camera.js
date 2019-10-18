import React from "react";
import {
	Alert,
	StyleSheet,
	Platform,
	Image,
	Text,
	View,
	ScrollView,
	Button,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { RNCamera } from "react-native-camera";
import CONSTANTS from "./components/Constants.js";
class CameraScreen extends React.Component {
	state = {
		recognizedSerialNumber: ""
	};

	render() {
		var temp;
		const { height, width } = Dimensions.get("window");
		const maskRowHeight = height * 0.05;
		const maskColWidth = width * 0.2;
		
		return (
		
			<View style={styles.container}>
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					captureAudio={false}
					style={styles.preview}
					cropScanArea={[0.8, 0.25]}
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
					onTextRecognized={data => {
						temp = data.textBlocks;

						if (typeof temp !== "undefined") {
							for (let i = 0; i < temp.length; i++) {
								if (
									temp[i].value.length ==
									CONSTANTS.SERIAL_LENGTH
								) {
									var possibleSerial = temp[i].value;
									if (CONSTANTS.REGEX.test(possibleSerial)) {
										Alert.alert(possibleSerial);
										//Obviously will not alert, but rather send value elsewhere.
									}
								}
							}
						}
					}}
				>
				
					<View style = {styles.maskOuter}> 
						<View style={[{ flex: maskRowHeight },styles.maskRow,styles.maskFrame]}/>
						<View style={[{ flex: 6 }, styles.maskCenter]}>
							<View style={[{ width: maskColWidth },styles.maskFrame]}/>
							<View style={styles.maskInner} />
							<View style={[{ width: maskColWidth },styles.maskFrame]}/>
						</View>
						<View style={[{ flex: maskRowHeight },styles.maskRow,styles.maskFrame]}/>
									<TouchableOpacity style={styles.topRight} onPress={()=> {
							console.log('Go Back');
							}
						  }>
						  <Text style = {[{color: "white" , fontSize: 24}]}>X</Text>
						</TouchableOpacity>
					</View>
				</RNCamera>
				
			</View>
		);
	}
}

export default CameraScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "black"
	},
	preview: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
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
		width: '90%',
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
	topRight: {alignSelf: 'flex-end', padding: 20, marginTop: 0, position: 'absolute', },
});
