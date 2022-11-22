type TIntervalSequence = 'W' | 'H' | 'WH'
type TChordSequence = 'min' | 'maj' | 'dim'

export default interface IScale {
  name: string,
  intervalSequence: TIntervalSequence[],
  chordSequence: TChordSequence[],
  tetradSequence: string []
}