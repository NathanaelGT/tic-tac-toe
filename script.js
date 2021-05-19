const state = new Array(9)
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const board = document.querySelector('main')
const messageBox = document.querySelector('#message-box')
const [messageElement, restartButton] = messageBox.children

for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div')

  cell.onclick = () => {
    if (cell.className) return

    state[i] = cell.className = turn

    const isWin = WINNING_COMBINATIONS.some(combination => (
      combination.every(index => state[index] === turn)
    ))
    const isDraw = state.every(Boolean)

    if (isWin || isDraw) {
      messageElement.innerText = isWin ? `${turn.toUpperCase()} Menang` : 'Seri'
      messageBox.className = 'show'

      return
    }

    setTurn(turn === 'x' ? 'o' : 'x')
  }

  board.appendChild(cell)
}

const startGame = () => {
  Array.from(board.children).forEach(cell => {
    cell.className = ''
  })
  state.fill(null)

  setTurn('x')
}

restartButton.onclick = () => {
  messageBox.className = ''
  startGame()
}

let turn = ''
const setTurn = newTurn => {
  turn = newTurn

  board.className = `${turn}-turn`
}

startGame()
