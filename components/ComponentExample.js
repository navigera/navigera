import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import InputSpinner from "./InputSpinner";
import PrimaryButton from "./PrimaryButton"
import SecondaryButton from "./SecondaryButton"

export default class ComponentExample extends React.Component {

	onPress = () => {
		console.log("Hey");
	 };

	render() {
		return (
			<View style={styles.container}>
					 <View>
					<InputSpinner></InputSpinner>
					</View>
					
                    <View>
					<PrimaryButton text={"Primary button"} onPress={this.onPress}></PrimaryButton>
					</View>
                    
                    <View>
				    <SecondaryButton text={"Secondary button"} onPress={this.onPress}></SecondaryButton>
					</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
        flexDirection:"column",
	},

});
