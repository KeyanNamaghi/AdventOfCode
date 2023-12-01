var fs = require('fs')

const input = fs.readFileSync(`./7_${process.argv.includes('example') ? 'example' : 'data'}.txt`, 'utf-8').split('\n')

let system = { name: '/', children: [] }
let current = system

input.forEach((line) => {
  const first = line.split(' ').at(0)
  const last = line.split(' ').at(-1)

  if (line.slice(0, 4) === '$ cd') {
    if (line.includes('/')) {
      current = system
    } else if (line.includes('..')) {
      current = current.parent
    } else {
      current = current.children.find((child) => child.name === last)
    }
  }

  if (first === 'dir') {
    current.children.push({ name: last, children: [], parent: current })
  } else {
    current.children.push({ name: last, children: [], parent: current, size: Number(first) })
  }
})

// Recursive time FML...
const calculateSize = (dir) => {
  let size = 0
  let folderSizes = []

  dir.children.forEach((child) => {
    if (child.size) {
      size += child.size
    }
    if (child.children?.length > 0) {
      const calculatedSizes = calculateSize(child)
      size += calculatedSizes.size
      folderSizes.push(...calculatedSizes.folderSizes)
    }
  })

  return { size, folderSizes: [...folderSizes, size] }
}

const { size, folderSizes } = calculateSize(system)

const sizeToDelete = size - 40000000
const answer = folderSizes.filter((value) => value > sizeToDelete).sort((a, b) => a - b)[0]

console.log({ answer })
