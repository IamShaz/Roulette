import './Square.css';
import React, { useState, useEffect, useRef } from 'react';

let betMap = {
  chipDefault: 1,
  chipSecond: 5,
  chipThird: 20,
}

export const Square = (props) => {
  const isOutside = props.type === 'Outside';
  const isInside = props.type === 'Inside';
  const [selected, setSelected] = useState(false);
  const squareRef = useRef(null);
  const winMarkRef = useRef(null);
  let squareWinner = winMarkRef.current?.children[0].classList;
  let square = squareRef.current?.children[0].classList;
  let classes = square && square?.value.split(' ');
  let classToRemove = classes && classes[classes.length - 1];

  useEffect(() => {
    if (props.reset) {
      classToRemove && classes[classes.length - 1] !== 'marker' && square.remove(classToRemove);
      props.setBetSum(props.betSum - betMap[classToRemove] > 0 ? props.betSum - betMap[classToRemove] : 0);
      setSelected(false);
    }
  }, [props.reset])

  useEffect(() => {
    if (selected && !props.isDisabled && props.balance > 0) {
      if (props.winMarker) squareWinner.remove('winMarker');
      square.add(Object.keys(betMap)[Object.values(betMap).indexOf(props.betUnit)]);

      if (squareRef.current.id) {
        props.setSelectedSquares(sel => ({ ...sel, [`row-${squareRef.current.id}`]: props.betUnit, }));
      } else {
        props.setSelectedSquares(sel => ({ ...sel, [props.num]: props.betUnit }));
      }

      props.setBetSum(props.betSum + props.betUnit);
      props.setBalance(props.balance - props.betUnit);

    } else if (!selected) {
      if (props.winMarker) squareWinner.remove('winMarker');

      if (squareRef.current.id) {
        props.setSelectedSquares((sel) => {
          delete sel[`row-${squareRef.current.id}`];
          return ({ ...sel })
        });
      } else {
        props.setSelectedSquares((sel) => {
          delete sel[props.num];
          return ({ ...sel })
        });
      }      

      if (square?.contains('chipDefault') ||
        square?.contains('chipSecond') ||
        square?.contains('chipThird')) {
        props?.setBalance(props.balance + (betMap[classToRemove]));
      }

      classToRemove && classes[classes.length - 1] !== 'marker' && square.remove(classToRemove);
      props.setBetSum(props.betSum - (betMap[classToRemove] || 0));
    }

  }, [selected]);

  useEffect(() => {
    if (props.winMarker) {
      if (props.num.toString() === props.prizeNumber) squareWinner.add('winMarker');
    } else {
      squareWinner?.remove('winMarker');
    }
  }, [props.winMarker]);

  return (
    <div
      ref={winMarkRef}
      className={`squareBase flex
        ${isOutside && 'outsideSquare'} 
        ${isInside && props.num === 0 ? 'zeroSquare' : ''}
        ${props.num === 'RED' && 'outsideRed'}
        ${props.num === 'BLACK' && 'outsideBlack'}`}
      onClick={(e) => setSelected(!selected)}
      disabled={props.isDisabled}
    >
      <span className={'marker'}></span>
      <div
        ref={squareRef}
        className={`squares flex
          ${isInside && props.num === 0 ? 'zero zeroSquare' : ''}
          ${isOutside && 'flexWide borderLeft'}`}
        key={isInside && props.num}
        id={props.id}
      >
        <span></span>
        <span style={props.style} className='squareVal flex'>{props.num}</span>
      </div>
    </div>
  );
}

export default Square;
