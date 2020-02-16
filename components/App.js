import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import NewsList from './NewsList';
import {getApiData} from '../util/ajax';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      currentPage: 1,
      isLoading: false,
      status: true,
    };
  }

  async componentDidMount() {
    await this.handleRefresh();
  }

  async handleRefresh() {
    try {
      const {currentPage} = this.state;
      this.setState({isLoading: true});

      // Get Api data.
      const response = await getApiData(currentPage);
      const responseJson = await response.json();

      if (responseJson.status === 'error') {
        Alert.alert('Error', responseJson.message, [{text: 'OK'}]);
        this.setState({status: false});
      } else {
        this.setState({
          newsList: responseJson.articles,
          // Check if reach the last page. The api response with 20 news/page by default.
          currentPage:
            currentPage < Math.floor(responseJson.totalResults / 20)
              ? currentPage + 1
              : 1,
          status: true,
        });
      }
    } catch (error) {
      Alert.alert(
        'Error',
        `${error.message}.\nPlease ensure that you have enabled Internet connection for your device.`,
        [{text: 'OK'}],
      );
      this.setState({status: false});
    }
    this.setState({isLoading: false});
  }

  getMessage() {
    const {status} = this.state;
    if (status === true) return 'Loading...';
    else
      return 'The service is temporarily unavailable 😴 please try to access the news list later.';
  }

  render() {
    const {newsList, isLoading} = this.state;
    return (
      <View style={styles.container}>
        {newsList.length > 0 ? (
          <NewsList
            newsList={newsList}
            isLoading={isLoading}
            onRefresh={async () => {
              await this.handleRefresh();
            }}
          />
        ) : (
          <Text style={styles.loading}>{this.getMessage()}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    textAlign: 'center',
    fontSize: 20,
  },
});

export default App;
