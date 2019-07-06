import React, {PureComponent} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const IMAGE_URL = require('../common/assets/orangePlanet.png');
const NUMBER_OF_COLUMNS = 2;
const PLANETS_URL = 'https://swapi.co/api/planets/';

export default class PlanetsList extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      planetList: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
        const swPlanetsListAPI = await fetch(PLANETS_URL);
        const swPlanetsListResult = await swPlanetsListAPI.json();
        this.setState({
          planetList: swPlanetsListResult.results,
          loading: false
        });
      } catch(err) {
          console.log("Error fetching data for Planets List", err);
      }
  }

  renderItem(data){
    return (
      <TouchableOpacity style={styles.planetListContainer}>
      <View style={styles.planetListItemContainer}>
          <Image source={IMAGE_URL}
              style={styles.planetPlaceHolder}/>
          <Text style={styles.planetNameText}>{data.item.name}</Text>
          <Text style={styles.planetPopulationText}>{data.item.population}</Text>
          </View>
      </TouchableOpacity>
    );
  }

  render() {
        const { planetList, loading } = this.state;
        if(!loading) {
            return (
              <View>
              <FlatList
                      data={planetList}
                      renderItem={this.renderItem}
                      keyExtractor={(item) => item.name}
                      numColumns={NUMBER_OF_COLUMNS}
                      />
              </View>
            );
        } else {
            return <ActivityIndicator />
        }
  }
}

const styles = StyleSheet.create({
  planetListContainer: {
    flex:1,
    flexDirection: 'column',
    margin: 1,
    borderRadius:10,
    borderWidth: 1,
    borderColor:'#696969',
    margin: 10,
    backgroundColor:'#696969',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  planetPlaceHolder: {
    height: 80,
    width: 80,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  planetListItemContainer: {
      flex: 1,
      justifyContent: 'space-between',
      margin:20,
  },
  planetNameText: {
    fontSize: 18,
    marginTop:10,
    marginLeft:5,
  },
  planetPopulationText: {
      fontSize: 12,
      marginLeft:5,
  },

});