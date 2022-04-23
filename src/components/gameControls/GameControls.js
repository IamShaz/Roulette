import './GameControls.css';
import React, { useEffect, useState } from 'react';

export const GameControls = (props) => {

  const [spinDisabled, setSpinDisabled] = useState(false);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * props.data.InsideData.length);
    props.setPrizeNumber(newPrizeNumber);
    props.setMustSpin(true);

    let arrow = document.querySelector('.wheel img[alt~="roulette-static"]');
    arrow.classList.add('arrowAnim');

    if (props.winMarker) props.setWinMarker(false);

    props.setWinTotal(0);
    props.setIsDisabled(true);
  }

  const handleClearClick = () => {
    props.setReset(true);
    setTimeout(() => props.setReset(false), 500);

    props.betSum > 0 ?
      props.setBalance(props.balance + props.betSum)
      : props.setBalance(props.balance);

    props.setWinMarker(false);
    props.setBetSum(0);
    props.setPrizeNumber(null);
    props.setSelectedSquares({})
    props.setWinTotal(0);
  }

  const handleNewGameClick = () => {
    props.setReset(true);
    setTimeout(() => props.setReset(false), 500);

    props.setWinMarker(false);
    props.setBalance(100);
    props.setPrizeNumber(null);
    props.setSelectedSquares({})
    props.setWinTotal(0);
    props.setBetSum(0);
  }

  useEffect(() => {
    props.balance < 0 || props.betSum === 0 ?
      setSpinDisabled(true) : setSpinDisabled(false);
  }, [props.balance, props.betSum]);

  return (
    <div className='gameControls flex'>
      <button disabled={props.isDisabled}
        onClick={() => handleClearClick()}>CLEAR BET</button>
      <button title="SPIN" className='spinBtn flex'
        disabled={props.isDisabled || spinDisabled}
        onClick={() => handleSpinClick()}><span></span></button>
      <button disabled={props.isDisabled}
        onClick={() => handleNewGameClick()}>NEW GAME</button>
    </div>
  );
}

export default GameControls;
