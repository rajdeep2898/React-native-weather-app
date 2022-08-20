import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'; 
import * as Location from 'expo-location'
import WeatherInfo from './Components/WeatherInfo';
import UnitsPicker from './Components/UnitsPicker';
import ReloadIcon from './Components/ReloadIcon';
import WeatherDetails from './Components/WeatherDetails';
import { colors } from './utils';

const WEATHER_API_KEY= 'f4a46fcac5e715e3ba24af5594a4bd46'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {
  const[errorMessage,setErrorMessage] = useState(null)
  const[currentWeather,setCurrentWeather] = useState(null)
  const[unitsSystem,setUnitsSystem] = useState('metric')

  useEffect(()=>{
    load()
  },[unitsSystem])

  async function load () {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let {status}= await Location.requestForegroundPermissionsAsync()
      if (status!=='granted'){
        setErrorMessage("We dont have permission")
        return
      }
      let location = await Location.getCurrentPositionAsync();
    
      const {latitude,longitude}=location.coords
      const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)
      const result = await response.json()
      if (response.ok){
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
  
    } catch (error) {
      setErrorMessage(error.message)
      
    }
  }
  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style='auto'></StatusBar>
        <View style={styles.main}>
          
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
        <StatusBar style="auto" />
      </View>
    );
  }else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} animating={true} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
});
