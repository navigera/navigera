import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';

export default class SearchBox extends React.Component {

	render() {
		const { searchBoxFocused, searchTextChanged } = this.props;

		return (
			<View style={styles.container}>
				<TextInput onFocus={searchBoxFocused} onChangeText={text => searchTextChanged(text)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
        flexDirection:"column",
	}, 
});
