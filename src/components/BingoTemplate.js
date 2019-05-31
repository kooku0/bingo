import React, { Component } from 'react';
import BingoBoard from './BingoBoard';
import BingoSuccessList from './BingoSuccessList';

import { connect } from 'react-redux';

class BingoTemplate extends Component {  
  render() {
    const { player1, player2, playerID } = this.props
    return (
      <div className="bingoTemplate">
        <h1>{`PLAYER${playerID}`}</h1>
          <BingoBoard
            board={playerID === 1 ? player1.board: player2.board}
            playerID={playerID}
          />
          <BingoSuccessList
            successList={playerID === 1 ? player1.successList: player2.successList}
            playerID={playerID}
          />
      </div>
    );
  }
}

export default connect (
  (state) => ({
    player1: state.game.player1,
    player2: state.game.player2
  })
)(BingoTemplate)
