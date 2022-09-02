const keys = require('../data/keys');
const scales = require('../data/scales');

function getChromaticNotesStartingWith(key) {
  const index = keys.findIndex(e => e === key);
  if (index > -1) {
    return keys.slice(index, keys.length).concat(keys.slice(0, index));
  }
}

function mountScaleNotes(scaleName, key) {
  if (scaleName === '*') return keys;

  const scaleProps = scales.find(e => e.name === scaleName);
  const rawScale = getChromaticNotesStartingWith(key);
  let notes = [];
  let count = 0;
  for (let interval of scaleProps.intervalSequence) {
    let note = rawScale[count];
    notes.push(note);
    if (interval === 'H') {
      count += 1;
    } else if (interval === 'W') {
      count += 2;
    } else if (interval === 'WH') {
      count += 3;
    }
  }
  return notes;
}

function mountScaleChords(scaleName, key) {
  const scaleProps = scales.find(e => e.name === scaleName);
  const scaleNotes = mountScaleNotes(scaleName, key);
  let scaleChords = [];
  for (let [indexNote, note] of scaleNotes.entries()) {
    const noteType = scaleProps.chordSequence[indexNote];
    let chord;
    if (noteType === 'maj') chord = note;
    if (noteType === 'min') chord = note + 'm';
    if (noteType === 'dim') chord = note + 'dim';
    if (noteType === 'aug') chord = note + 'aug';

    scaleChords.push(chord);
  }
  return scaleChords;
}

module.exports = { mountScaleNotes, mountScaleChords };
