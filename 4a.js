var fs = require('fs')

// 2-4,6-8 ❌
// 2-3,4-5 ❌
// 5-7,7-9 ❌
// 2-8,3-7 ✅
// 6-6,4-6 ✅
// 2-6,4-8 ❌
const overlaps = (props) => {
  const [first, second] = props
  if (first[0] <= second[0] && first[1] >= second[1]) return 1
  if (second[0] <= first[0] && second[1] >= first[1]) return 1
  return 0
}

const cleaningAssignments = fs
  .readFileSync(`./4_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8')
  .split('\n')
  .map((assignment) => assignment.split(',').map((item) => item.split('-').map(Number)))
  .map(overlaps)
  .reduce((prev, curr) => +prev + +curr, 0)

console.log(cleaningAssignments)
