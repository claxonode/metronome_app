import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect,useState,useRef } from 'react';
import {Audio} from 'expo-av'
import Slider from '@react-native-community/slider';

export default function App() {
  const [sound, setSound] = useState();
  const [bpm,setBpm] = useState(180)
  const [sliderValue,setSliderValue] = useState(0)
  const [metronome,setMetronome] = useState(false)


  // async function playAudioClip() {
  //   console.log("Loading Sound");
    
  //   setSound(sound)
  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }
  function stopMetronome() {
    setMetronome(false) 
    sound.unloadAsync()
  }
  async function playMetronome() {
    const {sound} = await Audio.Sound.createAsync(require('./assets/bubble.wav'));
    setSound(sound)
    // setMetronome(true)
    sound.playAsync()
    sound.setIsLoopingAsync(true)
  }

  // while (metronome === true) {
  //   setTimeout(async()=> {
  //     await sound.playAsync()
  //   },500)
  // }
  // useEffect(()=>{
  //   return sound ? ()=> {
  //     console.log('Unloading Sound')
  //     sound.unloadAsync()
  //   }: undefined
  // },[sound])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Play Metronome' onPress={playMetronome} ></Button>
      <Button title='Stop Metronome' onPress={stopMetronome} ></Button>
      <StatusBar style="auto" />

      <Slider 
        style={{width:200,height:40}} 
        minimumValue={120} maximumValue={200} step={1} onValueChange={(value)=>{setBpm(value)}}
        minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
      />
      <Text>Bpm: {bpm}</Text>
      <Slider 
        style={{width:200,height:40}} 
        minimumValue={0} maximumValue={1} onValueChange={(value)=>{setSliderValue(value)}}
        minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
      />
      <Text>Slider value: {sliderValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
