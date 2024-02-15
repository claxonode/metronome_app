import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect,useState } from 'react';
import {Audio} from 'expo-av'

export default function App() {
  const [sound, setSound] = useState();
  async function playAudioClip() {
    console.log("Loading Sound");
    const {sound} = await Audio.Sound.createAsync(require('./assets/bubble.wav'));
    setSound(sound)
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(()=>{
    return sound ? ()=> {
      console.log('Unloading Sound')
      sound.unloadAsync()
    }: undefined
  },[sound])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Play Sound' onPress={playAudioClip} ></Button>
      <StatusBar style="auto" />
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
