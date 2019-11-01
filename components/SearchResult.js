import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

export default class SearchResult extends React.Component {

    renderSearchResults(searchResults){
        if(searchResults && searchResults.length > 0){
            searchResults.map((item) => {
                return (<Text>{item.product_info.family}</Text>);
            });
        }else{
            return (<Text>No results found.</Text>);
        }
        
    }
    render() {
        const { searchResults } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderSearchResults(searchResults)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height: 0,
        backgroundColor: 'transparent',
    },
});
