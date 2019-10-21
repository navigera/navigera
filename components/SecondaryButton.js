
 import React, { Component } from 'react';
 import {TouchableHighlight,Text,StyleSheet, View } from 'react-native';
 
    export default class SecondaryButton extends Component {
      
        constructor(props) {
        super(props);
        this.state = { pressStatus: false };
        }

    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    render() {
        return (
            <View style={styles.box}>
                <TouchableHighlight activeOpacity={1}
                    style={this.state.pressStatus ? styles.buttonPress : styles.button }
                    onHideUnderlay={this._onHideUnderlay.bind(this)}
                    onShowUnderlay={this._onShowUnderlay.bind(this)}
                    onPress={this.props.onPress}
                >
                    <Text style={this.state.pressStatus? styles.textPress : styles.text}>
                        {this.props.text}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
    }
    

    const styles = StyleSheet.create({
    Box:{
        flexWrap:"wrap",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        borderColor: "black",
        borderWidth: 1,
        width:"100%",
    },
    buttonPress: {
        borderColor: "#000066",
        backgroundColor: "#000066",
        borderWidth: 1,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        margin: 10,
        color: "black",
        textAlign: "center"
    },
    textPress: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        color: "white"
    },
    
    });