import { Audio,InterruptionModeAndroid,InterruptionModeIOS } from "expo-av";


export const setupAudio = () => {
    Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS:InterruptionModeIOS.DuckOthers,
        interruptionModeAndroid:InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid:true,
        playThroughEarpieceAndroid:false,
      })
}