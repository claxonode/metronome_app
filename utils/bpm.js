
export const bpmToMilliseconds = (bpm,tempo) => {
    const ONE_MINUTE_IN_MILLISECONDS = 60000
    const durationOfQuarterNote = ONE_MINUTE_IN_MILLISECONDS / bpm

    return durationOfQuarterNote * 4/tempo
}

// export const bpmToSeconds = (bpm,tempo) => {
//   const ONE_MILLISECOND_TO_ONE_SECOND = 1000
//   return bpmToMilliseconds(bpm,tempo) / ONE_MILLISECOND_TO_ONE_SECOND
// }


// export const playMetronome = (audioFile,volume, metronomeSpeed) => {
//     return setInterval(() => {
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
//   }