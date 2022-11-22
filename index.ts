import Scale from './src/domain/use-cases/scale'
const scale = new Scale()

const result = scale.mountScaleChords('melodicMinor', 'E')

console.log(result)
