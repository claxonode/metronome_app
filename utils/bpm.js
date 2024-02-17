
export const bpmToMilliseconds = (bpm,tempo) => {
    const ONE_MINUTE_IN_MILLISECONDS = 60000
    const durationOfQuarterNote = ONE_MINUTE_IN_MILLISECONDS / bpm

    return durationOfQuarterNote * 4/tempo
}