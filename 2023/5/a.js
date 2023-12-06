const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n\n')

const seeds = lines.shift().split(' ').slice(1).map(Number)

const conversions = lines.map((line) => {
  const [_, to] = line.split(':\n')
  const map = to.split('\n').map((row) => row.split(' ').map(Number))
  return map
})

const convert = (seed, conversions) => {
  let result = seed
  conversions.forEach(([destination, source, range]) => {
    if (seed >= source && seed < source + range) {
      result = destination - source + seed
    }
  })
  return result
}

const locations = seeds.map((seed) => {
  return conversions.reduce((acc, conversion) => {
    return convert(acc, conversion)
  }, seed)
})

const min = Math.min(...locations)
console.log(min) // 535088217
