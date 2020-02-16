import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet} from 'react-native';
import Moment from 'moment';

class NewsItem extends Component {
  static propTypes = {
    news: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.news;
    const defaultImageUrl =
      'https://findyourjobjoy.com/wp-content/uploads/2019/03/business-news-daily-logo-png.png';
    Moment.locale('au');
    const dataTime = Moment(item.publishedAt).format('L LT');
    return (
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{
            uri: String(item.urlToImage ? item.urlToImage : defaultImageUrl),
          }}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.footer}>
            by {item.source.name} on {dataTime}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 8,
    marginTop: 12,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    textAlign: 'right',
    fontSize: 10,
    marginTop: 5,
  },
});

export default NewsItem;
