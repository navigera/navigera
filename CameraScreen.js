
import React from 'react';
import { Alert, StyleSheet, Platform, Image, Text, View, ScrollView, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CONSTANTS from './components/Constants.js';
export default class CameraScreen extends React.Component {
	
	state = { 
		recognizedSerialNumber: "",
	}
	


  render() {
	var temp; 
	  return (
      <View style={styles.container}>
        <RNCamera ref={
			ref => {
				this.camera = ref;
			}
		}
		captureAudio = {false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.Torch}
		
        androidCameraPermissionOptions={
			{
				title: 'Permission to use camera',
				message: 'We need your permission to use your camera',
				buttonPositive: 'Ok',
				buttonNegative: 'Cancel',
			}
		}
        androidRecordAudioPermissionOptions={
			{
				title: 'Permission to use audio recording',
				message: 'We need your permission to use your audio',
				buttonPositive: 'Ok',
				buttonNegative: 'Cancel',
			}
		}
				onTextRecognized = {(data)=>{
					temp = data.textBlocks;
					
					
					if(typeof temp !=='undefined'){
						for(let i = 0; i<temp.length; i++){
							if(temp[i].value.length == CONSTANTS.SERIAL_LENGTH){
								var possibleSerial = temp[i].value;
								if(CONSTANTS.REGEX.test(possibleSerial)){
									Alert.alert(temp[i].value);
									this.setState({recognizedSerialNumber: temp[i].value});
								}
							}
						}
					}
			}
		}

		/>
			 
      </View>

    );
  }
}


const styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	bottom: {
		flex: 0,
		justifyContent: 'flex-end',
		marginBottom: 0
	}
	
})