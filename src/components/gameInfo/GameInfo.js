import './GameInfo.css';
import React, { useState } from 'react';
import Chip from './chip/Chip';

export const GameInfo = (props) => {
  const [selectedChip, setSelectedChip] = useState(null);

  return (
    <div>
      <div className='flex gameInfoContainer'>
        <div className='flex units'>
          <Chip value={1}
            {...{ selectedChip, setSelectedChip }}
            chipStyle='chipDefault'
            setBetUnit={props.setBetUnit}
            default
          />
          <Chip value={5}
            {...{ selectedChip, setSelectedChip }}
            chipStyle='chipSecond'
            setBetUnit={props.setBetUnit}
          />
          <Chip value={20}
            {...{ selectedChip, setSelectedChip }}
            chipStyle='chipThird'
            setBetUnit={props.setBetUnit}
          />
        </div>
        <div>
          <div className='gameInfo'>Bet Amount: ${props.betSum}</div>
          <div className='gameInfo'>Total Balance: ${props.balance}</div>
        </div>
      </div>
      <div className='limits flex'>
        <div>Min: $1</div>
        <span className='spacer'>|</span>
        <div>Max: $100</div>
      </div>
    </div>
  );
}

export default GameInfo;
