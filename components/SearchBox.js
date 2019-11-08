import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class SearchBox extends React.Component {
	constructor (props){
		super(props);
		this.focusChanged = this.focusChanged.bind(this);

		this.state = {
			isFocused: false,
			products: [],
			modalVisible: false,
			placeholder: "Search"
		  };
	}

	focusChanged(){
		const {searchBarFocused} = this.props;
		this.setState({ placeholder: "" })
		if(!this.props.isFocused)
			searchBarFocused();	
			
	}
		
	render() {
		const {searchTextChanged} = this.props;
		return (
			<View style={this.props.isFocused ? styles.focusedContainer : styles.container}>
				<TextInput 
					style={this.props.isFocused ? styles.focused : styles.textBox} 
					onFocus={this.focusChanged}
					onBlur={() => this.setState({placeholder:"Search"})} 
					defaultValue={this.state.placeholder}
					onChangeText={text => searchTextChanged(text)}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"column",
		backgroundColor: "black",
		width:"100%",
		padding: 20,
		opacity:0.7
	}, 
	focusedContainer:{
		flexDirection:"column",
		backgroundColor: "#f4f4f4",
		width:"100%",
		padding: 20,
		opacity:0.7
	},
	textBox:{
		backgroundColor:"white",
		borderRadius: 30,
		opacity:0.4,
		textAlign: "auto",
		padding: 10,
	},
	focused:{
		backgroundColor:"white",
		borderRadius: 30,
		textAlign: "auto",
		padding: 10,
		borderColor:"gray",
		borderWidth:1,
	}
});

