const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n').map((line) => line.split(' ').map((value) => parseInt(value, 10)))

const findNextValue = (values) => {
  const differences = [values.reverse()]

  while (true) {
    const diff = []
    for (let i = 0; i < differences[0].length - 1; i++) {
      diff.push(differences[0][i + 1] - differences[0][i])
    }

    differences.unshift(diff)
    if (diff.every((d) => d === 0)) break
  }

  for (let i = 2; i < differences.length; i++) {
    differences[i].push(differences[i].slice(-1)[0] + differences[i - 1].slice(-1)[0])
  }

  return differences.slice(-1)[0].slice(-1)[0]
}

const answer = lines.map(findNextValue).reduce((acc, val) => acc + val, 0)

const t1 = performance.now()
// 913 - Took 6.81 ms
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
