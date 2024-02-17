import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AppState } from 'react-native';
import { useEffect,useState,useRef } from 'react';
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av'
import Slider from '@react-native-community/slider';
import audioFile from "./assets/bubble.wav"
import {bpmToMilliseconds} from "./utils/bpm.js"
// import BackgroundJob from 'react-native-background-job'
// import BackgroundTimer from 'react-native-background-timer';

export default function App() {
  const [sound,setSound] = useState()
  const [bpm,setBpm] = useState(120)
  const [tempo,setTempo] = useState(4) // Represented as a number of 4 so 1/4
  const [volume,setVolume] = useState(1)
  const [isPlaying,setIsPlaying] = useState(false)
  const intervalRef = useRef(0)
  const metronomeSpeed = bpmToMilliseconds(bpm,tempo)
  const appState = useRef(AppState.currentState)

  function stopMetronome() {
    setIsPlaying(false) 
    clearInterval(intervalRef.current)
  }

  useEffect(()=>{
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS:InterruptionModeIOS.DuckOthers,
      interruptionModeAndroid:InterruptionModeAndroid.DuckOthers,
      shouldDuckAndroid:true,
      playThroughEarpieceAndroid:true
    })
    return sound? ()=> {
      sound.unloadAsync();
    } : undefined
  },[sound]);

  async function playMetronome() {
    setIsPlaying(true)
    clearInterval(intervalRef.current)
    
    intervalRef.current = play(volume, metronomeSpeed)
    // intervalRef.current = setInterval((audioFile,volume)=>playMetronome(audioFile,volume),
    // metronomeSpeed)
    // console.log(intervalRef.current)
    // intervalRef.current = playBackground(volume,metronomeSpeed)
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
  useEffect(()=> {
    if (isPlaying && appState === 'active') {
      stopBackground()
      playMetronome()
    }
    if (appState === 'background' && isPlaying) {
      stopMetronome()
      playBackground()
    }
  },[bpm,volume,tempo,appState])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Play Metronome' onPress={playMetronome} ></Button>
      <Button title='Stop Metronome' onPress={stopMetronome} ></Button>
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
      <Button title='Play background' onPress={()=>playBackground(volume,metronomeSpeed)}/>
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
function play(volume, metronomeSpeed) {
  return setInterval(() => {
    //immediately play upon creation, then unload, catch do nothing?
    Audio.Sound.createAsync(
      audioFile,
      { shouldPlay: true, volume: volume }
    ).then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        //sound needs to be unloaded when sound finishes to prevent memory leaks
        res.sound.unloadAsync().catch(() => { });
      });
    }).catch((error) => { });
    console.log("It ran active")
  }, metronomeSpeed);
}

function playBackground(volume, metronomeSpeed) {
  BackgroundTimer.runBackgroundTimer(() => {
    //immediately play upon creation, then unload, catch do nothing?
    Audio.Sound.createAsync(
      audioFile,
      { shouldPlay: true, volume: volume }
    ).then((res) => {
      res.sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.didJustFinish) return;
        //sound needs to be unloaded when sound finishes to prevent memory leaks
        res.sound.unloadAsync().catch(() => { });
      });
    }).catch((error) => { });
    console.log("It ran background")
  }, metronomeSpeed);
}
function stopBackground() {
  BackgroundTimer.stopBackgroundTimer();
}

