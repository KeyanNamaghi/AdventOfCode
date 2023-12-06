import fs from 'fs'

const data = `const t0 = performance.now()
const useTest = true
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\\n')
const t1 = performance.now()
console.log(\`Took \${(t1 - t0).toPrecision(3)} ms.\`)
`

for (let i = 1; i <= 25; i++) {
  const directoryPath = `./${new Date().getFullYear()}/${i}`

  fs.mkdir(`./${directoryPath}`, async (err) => {
    if (err) {
      console.error('Error creating directory:', err.message)
      return
    }

    console.log('Directory created successfully.')
    await Bun.write(`${directoryPath}/data.txt`, '')
    await Bun.write(`${directoryPath}/test.txt`, '')
    await Bun.write(`${directoryPath}/a.js`, data)
    await Bun.write(`${directoryPath}/b.js`, data)
    await Bun.write(`${directoryPath}/.gitignore`, '*')
  })
}
