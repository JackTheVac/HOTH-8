import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Geo from './component/Geo';

export default class App extends React.Component {
constructor(){

  super();
  this.state = {
        ready: false,
        where: {lat:null, lng:null},
        error: null
  }
}
componentDidMount(){
  let geoOptions = {
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60 * 60 //how long the location is valid 
  };

  this.setState({ready:false, error: null});
  navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoFailuer, geoOptions); //(function when it works, function when it doesn't, options)

}

geoSuccess = (position) =>{
  
  this.setState({
    ready:true,
    where: {lat: position.coords.latitude , lng: position.coords.longitude}
  
  
  })

}

geoFailure = (err) => {
  this.setState({error: err.message});

}



render(){
  return (

    
    //first branch is when you DO get location so that it returns that you are using geolocation
<View stye={styles.container}>
  
  {!this.state.ready && (<Text style = {styles.big}>Using Geolocation in React Native.</Text>)} 
  
  {this.state.error && (<Text style = {styles.big}>{this.state.error}.</Text>)}

  {this.state.ready && (
    <Text style={styles.big}>{
      `Latitude: ${this.state.where.lat}
      Longitude: ${this.state.where.lng}`
      
      

    }
 
    </Text>

  )}

</View>


  
    )

}



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big:{
    fontSize: 48
  }
});
