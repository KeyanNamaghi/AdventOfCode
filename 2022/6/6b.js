var fs = require('fs')

// Here are the first positions of start-of-message markers for all of the above examples:

// mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
// nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
// nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
// zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26

const hasMarker = (arr) => {
  return [...new Set(arr)].length === arr.length
}

const input = fs.readFileSync(`./6_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8').split('')
const windowSize = 14
let answer = 0

for (let index = 0; index < input.length - windowSize; index++) {
  if (hasMarker(input.slice(index, index + windowSize))) {
    answer = index + windowSize
    break
  }
}

console.log({ answer })
