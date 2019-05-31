import { createAction, handleActions } from 'redux-actions';
import * as STRING from '../../string'
// 액션 타입을 정의해줍니다.
const GAMESTART = 'game/GAMESTART';
const CLICKBINGO = 'game/CLICKBINGO'
const RESET = 'game/RESET'

export const gameStart = createAction(GAMESTART);
export const clickBingo = createAction(CLICKBINGO);
export const reset = createAction(RESET)

const initialState = {
  gameState: STRING.start,
  playerTurn: 0,
  winner: '',
  player1: {
    board: Array.from(Array(5), () => Array(5).fill({number:0,checked:false})),
    successList: []
  },
  player2: {
    board: Array.from(Array(5), () => Array(5).fill({number:0,checked:false})),
    successList: []
  }
};

export default handleActions({
  [GAMESTART]: (state, action) => {
    const nextPlayer1 = {...state.player1}
    nextPlayer1.board = shuffleRandom()
    nextPlayer1.successList = []
    const nextPlayer2 = {...state.player2}
    nextPlayer2.board = shuffleRandom()
    nextPlayer2.successList = []
    return {
      ...state,
      gameState: STRING.restart,
      playerTurn: 1,
      player1: nextPlayer1,
      player2: nextPlayer2
    }
  },
  [CLICKBINGO]: (state, action) => {
    const number = action.payload
    const nextPlayer1 = {...state.player1}
    const nextPlayer2 = {...state.player2}
    let nextWinner = state.winner
    const players = [nextPlayer1, nextPlayer2]
    let x, y
    for (let player of players) {
      x = player.board.findIndex((subArr) => {
        y = subArr.findIndex((item) => {return item.number === number})
        return y !== -1
      })
      player.board[x][y].checked = true
      bingoCheck(player, x, y)
    }
    if (nextPlayer1.successList.length >= 5 && nextPlayer2.successList.length >= 5) {
      nextWinner = STRING.tie
    }
    else if (nextPlayer1.successList.length >= 5) {
      nextWinner = STRING.win1P
    }
    else if (nextPlayer2.successList.length >= 5) {
      nextWinner = STRING.win2P
    }
    return {
      ...state,
      winner: nextWinner,
      playerTurn: state.playerTurn===1?2:1,
      player1: nextPlayer1,
      player2: nextPlayer2
    }
  },
  [RESET]: (state, action) => {
    return initialState
  }
}, initialState);

function shuffleRandom () {
  let ar = []
  let temp
  let rnum
  for (let i=1; i<=25; i++) ar.push({number:i,checked:false})
  for (let i=0; i< ar.length ; i++) {
    rnum = Math.floor(Math.random() * 25);
    temp = ar[i];
    ar[i] = ar[rnum];
    ar[rnum] = temp;
  }
  var resultArr = [ar.slice(0,5),ar.slice(5,10),ar.slice(10,15),ar.slice(15,20),ar.slice(20,25)]
  return resultArr
}

function bingoCheck (player, x, y) {
  let { board, successList } = player
  // 가로
  let bingo = board[x].every(({checked}) => checked === true)
  if (bingo) successList.push('가로/'+(x+1).toString())
  // 세로
  let count = 0
  for (let i  = 0; i < 5; i++) {
    if (board[i][y].checked) count++
  }
  if (count === 5) successList.push('세로/'+(y+1).toString())
  // 대각선 1
  if (x === y) {
    count = 0
    for (let i  = 0; i < 5; i++) {
      if (board[i][i].checked) count++
    }
    if (count === 5) successList.push('대각선/1')
  }
  // 대각선 2
  if (x === 4 - y) {
    count = 0
    for (let i  = 0; i < 5; i++) {
      if (board[i][4 - i].checked) count++
    }
    if (count === 5) successList.push('대각선/2')
  }
}