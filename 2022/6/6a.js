var fs = require('fs')

// Here are a few more examples:

// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11

const hasMarker = (arr) => {
  return [...new Set(arr)].length === arr.length
}

const input = fs.readFileSync(`./6_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8').split('')
const windowSize = 4
let answer = 0

for (let index = 0; index < input.length - windowSize; index++) {
  if (hasMarker(input.slice(index, index + windowSize))) {
    answer = index + windowSize
    break
  }
}

console.log({ answer })
