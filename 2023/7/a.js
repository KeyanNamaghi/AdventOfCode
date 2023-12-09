const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n').map((line) => line.split(' '))

const cardRanks = '23456789TJQKA'

const getCardType = (card) => {
  const letters = card.split('')
  const set = new Set(letters)
  const uniqueCards = Array.from(set)

  switch (set.size) {
    case 1:
      return 6
    case 2: {
      const cardCounts = uniqueCards.map((letter) => letters.filter((l) => l === letter).length)
      return cardCounts.some((count) => count === 4) ? 5 : 4
    }
    case 3: {
      const cardCounts = uniqueCards.map((letter) => letters.filter((l) => l === letter).length)
      return cardCounts.some((count) => count === 3) ? 3 : 2
    }
    case 4:
      return 1
    case 5:
      return 0
  }
  return
}

const orderedCards = lines
  .map(([cards, bid]) => {
    const type = getCardType(cards)
    const handValues = cards.split('').map((card) => cardRanks.indexOf(card).toString(16))
    return { bid, handValues, hex: Number('0x' + type + handValues.join('')) }
  })
  .sort((a, b) => a.hex - b.hex)

const answer = orderedCards.map(({ bid }, index) => bid * (index + 1)).reduce((a, b) => a + b, 0)

const t1 = performance.now()
// 253933213 - Took 10.5 ms.
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
