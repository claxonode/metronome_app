import audioFile from '../assets/bubble.wav'
import { Audio } from 'expo-av';
import BackgroundTimer from 'react-native-background-timer';


class Metronome {
    constructor() {
    }
    play(volume, metronomeSpeed) {
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
        }, metronomeSpeed);
    }
    playBackground(volume,metronomeSpeed) {
        return BackgroundTimer.setInterval(() => {
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
          }, metronomeSpeed);
    }
    playSound(volume) {
        return Audio.Sound.createAsync(
            audioFile,
            { shouldPlay: true, volume: volume }
          ).then((res) => {
            res.sound.setOnPlaybackStatusUpdate((status) => {
              if (!status.didJustFinish) return;
              //sound needs to be unloaded when sound finishes to prevent memory leaks
              res.sound.unloadAsync().catch(() => { });
            });
          }).catch((error) => { });
    }
    stop(ref) {
        clearInterval(ref)
    }
    stopBackground(ref) {
      BackgroundTimer.clearInterval(ref)
    }
}

// export function play(volume, metronomeSpeed) {
//     return BackgroundTimer.setInterval(() => {
//       //immediately play upon creation, then unload, catch do nothing?
//       Audio.Sound.createAsync(
//         audioFile,
//         { shouldPlay: true, volume: volume }
//       ).then((res) => {
//         res.sound.setOnPlaybackStatusUpdate((status) => {
//           if (!status.didJustFinish) return;
//           //sound needs to be unloaded when sound finishes to prevent memory leaks
//           res.sound.unloadAsync().catch(() => { });
//         });
//       }).catch((error) => { });
//     }, metronomeSpeed);
// }

// export function stopMetronome(ref) {
//     setIsPlaying(false) 
//     BackgroundTimer.clearInterval(intervalRef.current)
// }

export default new Metronome();
