import React, { Component } from 'react';
import BingoTemplate from './components/BingoTemplate'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from './store/modules/game';

class App extends Component {
  winnerFunc () {
    const { winner, gameActions } = this.props
    if (winner !== '') {
      setTimeout(() => {alert(winner); gameActions.reset();}, 100)
    }
  }
  render() {
      const { gameState, gameActions } = this.props
      return (
        <div>
          {this.winnerFunc()}
          <button onClick={() => gameActions.gameStart()}>{gameState}</button>
          <div className="container">
              <BingoTemplate playerID={1}/>
              <BingoTemplate playerID={2}/>
          </div>
        </div>
      );
  }
}
export default connect (
  (state) => ({
    gameState: state.game.gameState,
    winner: state.game.winner
  }),
  (dispatch) => ({
    gameActions: bindActionCreators(gameActions, dispatch)
  })
)(App)
