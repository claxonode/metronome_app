import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AppState } from 'react-native';
import { useEffect,useState,useRef } from 'react';
import Slider from '@react-native-community/slider';
import {bpmToMilliseconds} from "./utils/bpm.js"
import BackgroundTimer from 'react-native-background-timer';

import {setupAudio} from './utils/audio.js'
import Metronome from './utils/metronome.js'


export default function App() {
  // const [sound,setSound] = useState()
  const [bpm,setBpm] = useState(120)
  const [tempo,setTempo] = useState(4) // Represented as a number of 4 so 1/4
  const [volume,setVolume] = useState(1)
  const [isPlaying,setIsPlaying] = useState(false)
  const intervalRef = useRef(0)
  const metronomeSpeed = bpmToMilliseconds(bpm,tempo)
  const appState = useRef(AppState.currentState)


  useEffect(()=> {
    setupAudio();
    return ()=> {
      stopMetronome()
    }
  },[]);
  useEffect(()=> {
    if (isPlaying) {
      stopMetronome()
      playMetronome()
    }
  },[bpm,volume,tempo])
  
  function stopMetronome() {
    setIsPlaying(false) 
    // Metronome.stop(intervalRef.current)
    Metronome.stopBackground(intervalRef.current)
  }
  function playMetronome() {
    setIsPlaying(true)
    // clearInterval(intervalRef.current)
    // intervalRef.current = Metronome.play(volume,metronomeSpeed)
    BackgroundTimer.clearInterval(intervalRef.current)
    intervalRef.current = Metronome.playBackground(volume,metronomeSpeed)
  }

  function metronomeOnPressHandler() {
    if (isPlaying) {
      stopMetronome()
    }
    else {
      playMetronome()
    }
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title={isPlaying?"Stop":"Play"} onPress={metronomeOnPressHandler} ></Button>
      <StatusBar style="auto" />

      <Slider 
        style={{width:200,height:40}} value={bpm}
        minimumValue={120} maximumValue={240} step={1} onValueChange={(value)=>{setBpm(value)}}
        minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
      />
      <Text>Bpm: {bpm}</Text>
      <Slider 
        style={{width:200,height:40}} step={0.1} value={volume}
        minimumValue={0} maximumValue={1} onValueChange={(value)=>{setVolume(value)}}
        minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
      />
      <Text>Volume: {volume.toFixed(1)}</Text>
      <Slider 
        style={{width:200,height:40}} step={4}
        minimumValue={4} maximumValue={16} onValueChange={(value)=>{setTempo(value)}}
        minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
      />
      <Text>Tempo: 1/{tempo}</Text>
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
