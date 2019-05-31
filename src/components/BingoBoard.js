import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from '../store/modules/game';
import Alert from 'react-s-alert';

class BingoBoard extends Component {
  
  render() {
    const { gameActions, playerID, playerTurn } = this.props
    const boardTable = this.props.board.map(
      (item1, index1) => {
        return (
          <tr key={index1}>
            {
              item1.map(
                (item2, index2) => {
                  return (
                    <td
                      className={item2.checked?'checked':'unchecked'}
                      key={index2}
                      onClick={(e)=>{
                        e.stopPropagation();
                        if (playerTurn === playerID && !item2.checked) {
                          gameActions.clickBingo(item2.number)
                        } else if (playerTurn !== playerID && playerTurn !== 0) {
                          Alert.info('잘못된 차레입니다.', {
                            position: 'top-right',
                            effect: 'jelly',
                            html: true
                          });
                        }
                      }}
                    >
                      {item2.number === 0 ? '' : item2.number}
                    </td>
                  )}
              )
            }
          </tr>
        )}
    )
    return (
      <div className="bingoBoard">
        <table id="card">
          <tbody>
          {boardTable}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect (
  (state) => ({
    playerTurn: state.game.playerTurn
  }),
  (dispatch) => ({
    gameActions: bindActionCreators(gameActions, dispatch)
  })
)(BingoBoard)
