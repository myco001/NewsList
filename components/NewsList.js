import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, Text, StyleSheet, SafeAreaView} from 'react-native';
import NewsItem from './NewsItem';

class NewsList extends Component {
  static propTypes = {
    newsList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
  };

  render() {
    return (
      <SafeAreaView style={styles.list}>
        <FlatList
          data={this.props.newsList}
          renderItem={({item}) => <NewsItem news={item} />}
          refreshing={this.props.isLoading}
          onRefresh={this.props.onRefresh}
          keyExtractor={item => item.title}
          ListHeaderComponent={this.Render_FlatList_Sticky_header}
          stickyHeaderIndices={[0]}
        />
      </SafeAreaView>
    );
  }

  Render_FlatList_Sticky_header = () => {
    const Sticky_header_View = (
      <View style={styles.header}>
        <Text style={styles.headerText}>Business News Today</Text>
      </View>
    );
    return Sticky_header_View;
  };
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    aspectRatio: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
  },
});

export default NewsList;
