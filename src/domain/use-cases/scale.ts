import TKey from '../models/key'
import IScale from '../models/scale'
import keys from '../../data/keys.json'
import scales from '../../data/scales.json'
function getChromaticNotesStartingWith (key: TKey): string[] {
  const index = keys.findIndex(e => e === key)
  const notesStartingWithKey = keys.slice(index, keys.length).concat(keys.slice(0, index))
  return notesStartingWithKey
}

export default class Scale {
  mountScaleNotes (scaleName: string, key:TKey): string[] {
    if (scaleName === '*') return keys

    const scaleProps = scales.find(e => e.name === scaleName)
    if(!scaleProps){
      //test
      throw new Error()
    }
    const rawScale = getChromaticNotesStartingWith(key)
    let notes = []
    let count = 0
    for (const interval of scaleProps.intervalSequence) {
      const note = rawScale[count];
      notes.push(note)
      if (interval === 'H') {
        count += 1
      } else if (interval === 'W') {
        count += 2
      } else if (interval === 'WH') {
        count += 3
      }
    }
    return notes
  }

  mountScaleChords (scaleName: string, key: TKey): string[] {
    const scaleProps = scales.find(e => e.name === scaleName)
    if(!scaleProps){
      throw new Error()
    }
    const scaleNotes = this.mountScaleNotes(scaleName, key)

    let scaleChords = scaleNotes.map((note, indexNote) => {
      const noteType = scaleProps.chordSequence[indexNote]
      let chord: string
      if (noteType === 'min') chord = note + 'm'
      else if (noteType === 'dim') chord = note + 'dim'
      else if (noteType === 'aug') chord = note + 'aug'
      else chord = note
      
      return chord
    })

    return scaleChords
  }
}


