import React from 'react';
import { Text, StyleSheet, View, BackHandler } from 'react-native';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import { GetSearchResult } from "../utilities.js";

export default class SearchView extends React.Component {

    constructor(){
        super();
        this.state = {
            searchResults: [],
            resultOpened: false
        }
    }

    backHandler;

    searchBoxFocused = () => {
        //Show search result window?
        //Just make sure the result window remains visible if searchResults.length > 0
        //to avoid closing it when the user tries to scroll through the results.¨
        this.setState({resultOpened: true});
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.closeOverlay);
    }

    closeOverlay = () => {
        this.setState({resultOpened: false});
        backHandler.remove();
    }

    searchTextChanged = (text) => {
        //Get search results, so we can update the results page
        let searchResults = GetSearchResult(text);
        if (searchResults) {
            this.setState({ searchResults: searchResults })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBox defaultValue="Search" searchBoxFocused={this.searchBoxFocused} searchTextChanged={this.searchTextChanged} />
                <SearchResult searchResults={this.state.searchResults} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "transparent",
    },
});
