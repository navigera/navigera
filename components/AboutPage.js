import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler} from 'react-native';
import { globalStyles } from "../utilities";
import SettingsHeader from "./SettingsHeader.js";


export default class AboutPage extends Component {
    constructor(props){
        super(props);

        this.aboutClosed = this.aboutClosed.bind(this);
    }

    aboutClosed(){
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.aboutClosed
        );
    }

    componentWillUnmount(){
        this.backHandler.remove();
    }

  render() {
    return (
        <View style={styles.container}>

            <SettingsHeader titleText={"About NAVIGERA"} method={this.aboutClosed}/>

            <View style={styles.contentContainer}>
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Version</Text> 
                    <Text style={[styles.infoText, globalStyles.regular]}>1.0.0</Text>   
                </View>
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>License</Text>
                    <Text style={[styles.infoText, globalStyles.regular]}>IKEA</Text>  
                </View>
                
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Terms & Conditions</Text>
                </View> 
                <View style={styles.optionContainer}>
                    <Text style={[styles.optionText, globalStyles.regular]}>Privacy policy</Text>
                </View> 
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  optionContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 25,
    paddingLeft: 25,
  },
  optionText: {
    color: 'black',
    fontSize: 18,
  },
  infoText: {
    color: 'grey',
    marginRight: 10,
    fontSize: 14,
  },
})