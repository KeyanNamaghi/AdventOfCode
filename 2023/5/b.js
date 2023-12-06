const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n\n')
const seeds = lines.shift().split(' ').slice(1).map(Number)

const seedRanges = []
for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push([seeds[i], seeds[i] + seeds[i + 1] - 1])
}

const conversions = lines.map((line) => {
  const [_, to] = line.split(':\n')
  const map = to.split('\n').map((row) => row.split(' ').map(Number))
  return map
})

const getIntersection = (range1, range2) => {
  const start = Math.max(range1[0], range2[0])
  const end = Math.min(range1[1], range2[1])
  if (start > end) return null // No overlap
  return [start, end]
}

const convert = (seedBucket, conversions) => {
  const mappedValues = []
  const newBuckets = []

  conversions.forEach(([destination, source, range]) => {
    const convertedBucket = [source, source + range - 1] // [98, 99]
    const intersection = getIntersection(seedBucket, convertedBucket)
    if (intersection) {
      newBuckets.push([destination - source + intersection[0], destination - source + intersection[1]])
      mappedValues.push(intersection)
    }
  })

  const sorted = mappedValues.sort((a, b) => a[0] - b[0])
  for (let i = 0; i < sorted.length; i++) {
    if (seedBucket[0] < sorted[i][0]) newBuckets.push([seedBucket[0], sorted[i][0] - 1])
    seedBucket[0] = sorted[i][1] + 1
  }
  if (seedBucket[0] <= seedBucket[1]) newBuckets.push(seedBucket)

  return newBuckets
}

const calculateBuckets = (ranges, conversion) => {
  return ranges.map((seed) => convert(seed, conversion))
}

let buckets = seedRanges
for (let i = 0; i < conversions.length; i++) {
  buckets = calculateBuckets(buckets, conversions[i]).flat()
}

const min = Math.min(...buckets.map((bucket) => bucket[0]))
console.log(min) // 51399228
