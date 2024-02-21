import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AppState, SafeAreaView } from 'react-native';
import { useEffect,useState,useRef } from 'react';
import Slider from '@react-native-community/slider';
import {bpmToMilliseconds} from "./utils/bpm.js"
import BackgroundTimer from 'react-native-background-timer';
import {setupAudio} from './utils/audio.js'
import Metronome from './utils/metronome.js'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    // intervalRef.current = Metronome.playBackground(volume,metronomeSpeed)
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
    <SafeAreaView style={styles.container} >
      <View style={styles.box}>
        <Text style={styles.heading}>Metronome App</Text>
        <View style={styles.sliderBox}>
        <Slider 
          style={styles.slider} value={bpm}
          minimumValue={120} maximumValue={240} step={1} onValueChange={(value)=>{setBpm(value)}}
          minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
        />
        <Text style={styles.sliderText}>Bpm: {bpm}</Text>
        <Slider 
          style={styles.slider} step={0.1} value={volume}
          minimumValue={0} maximumValue={1} onValueChange={(value)=>{setVolume(value)}}
          minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
        />
        <Text style={styles.sliderText}>Volume: {volume.toFixed(1)}</Text>
        <Slider 
          style={styles.slider} step={4}
          minimumValue={4} maximumValue={16} onValueChange={(value)=>{setTempo(value)}}
          minimumTrackTintColor='#000000' maximumTrackTintColor="#000000"
        />
        <Text style={styles.sliderText}>Tempo: 1/{tempo}</Text>
        <Icon size={50} style={styles.icon} name={isPlaying?'stop':'play-arrow'} onPress={metronomeOnPressHandler}></Icon>
        </View>
        
      </View>
      
      <StatusBar style="auto" />
      
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderBox: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    padding: 10
  },
  box: {
    fontSize: 40,
    fontWeight: "500",
    fontFamily: 'notoserif',
    backgroundColor:'silver',
    width:'85%',
    borderColor:'white',
    borderWidth:10,
    borderRadius:3,
    // height:'60px',
    // lineHeight:50,
    flex:1,
    // flexDirection:'column',
    // flex: 1,
    margin:50,
    height:400,
    
    justifyContent:'center',
    verticalAlign:'center',
    textAlign:'center'
  },
  heading: {
    fontSize: 40,
    textAlign:'center',
    paddingTop:20,
  },
  sliderText: {
    fontSize:18,
    textAlign:'center',
    paddingBottom:50,
  },
  slider: {
    width:200,
    justifyContent:'center',
    alignItems: 'center',
    textAlign:'center',
  },
  icon: {
    color:'green'
  }
});
