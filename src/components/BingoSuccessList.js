import React, { Component } from 'react';

class BingoSuccessList extends Component {
  
  render() {
    const successList = this.props.successList.map(
      (item, index) => {
        return (
          <div key={index} className="badge tag">
            {item}
          </div>
        )
      }
    )
    return (
      <div className="bingoSuccessList">
          {successList}
      </div>
    );
  }
}

export default BingoSuccessList
