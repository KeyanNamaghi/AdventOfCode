const t0 = performance.now()
const useTest = false
const file = Bun.file(useTest ? 'test.txt' : 'data.txt')
const contents = await file.text()
const lines = contents.split('\n').map((line) => line.split(' '))

const cardRanks = 'J23456789TQKA'

const getCardType = (card) => {
  const letters = card.split('')
  const regularCards = letters.filter((letter) => letter !== 'J')

  const mostCommonCard = regularCards.reduce((a, b, i, arr) => {
    return arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length ? a : b
  }, '')

  const lettersWithJokersSubstituted = letters.map((letter) => (letter === 'J' ? mostCommonCard : letter))

  const set = new Set(lettersWithJokersSubstituted)
  const uniqueCards = Array.from(set)

  switch (set.size) {
    case 1:
      return 6
    case 2: {
      const cardCounts = uniqueCards.map((letter) => lettersWithJokersSubstituted.filter((l) => l === letter).length)
      return cardCounts.some((count) => count === 4) ? 5 : 4
    }
    case 3: {
      const cardCounts = uniqueCards.map((letter) => lettersWithJokersSubstituted.filter((l) => l === letter).length)
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

// 253473930 - Took 15.4 ms
console.log(`${answer} - Took ${(t1 - t0).toPrecision(3)} ms.`)
