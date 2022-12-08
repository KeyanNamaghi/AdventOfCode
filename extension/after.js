// Delete sidebar advert
document.getElementById('sidebar').parentNode.removeChild(document.getElementById('sidebar'))

var htmlCollection = document.getElementsByClassName('privboard-row')

// Delete the stupid day number indicator thing
htmlCollection[0].parentNode.removeChild(htmlCollection[0])

for (var i = 0; i < htmlCollection.length; i++) {
  // Delete the score and add spacing
  htmlCollection[i].childNodes[0].style.marginRight = '20px'
  var scoreToRemove = htmlCollection[i].childNodes[1]
  scoreToRemove.parentNode.removeChild(scoreToRemove)
}

const calculateScore = (el) =>
  2 * el.getElementsByClassName('privboard-star-both').length +
  el.getElementsByClassName('privboard-star-firstonly').length

const arr = [].slice
  .call(htmlCollection)
  .sort((a, b) => {
    const scoreForA = calculateScore(a)
    const scoreForB = calculateScore(b)

    return scoreForB - scoreForA
  })
  .forEach((val, index, array) => {
    if (index > 0 && index < array.length && calculateScore(val) >= calculateScore(array[index - 1])) {
      val.childNodes[0].textContent = array[index - 1].childNodes[0].textContent
    } else {
      val.childNodes[0].textContent = index + 1 > 9 ? index + 1 : ` ${index + 1}`
    }

    document.body.appendChild(val)
  })
