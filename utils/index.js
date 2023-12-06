import fs from 'fs'

const data = `const useTest = true
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\\n')
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
