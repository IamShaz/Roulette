import './Table.css';
import Square from './square/Square';
import React, { useEffect } from 'react';
import Modal from '../modal/Modal';

export const Table = (props) => {

  const getWinNum = () => {
    let col = '';

    if (props.prizeNumber) {
      let winnerInfo = '';
      props.data.InsideData.filter(num => {
        if (props.prizeNumber.toString() === num.option) {
          let bgCol = num.style.backgroundColor
          let color = col = bgCol.charAt(0).toUpperCase() + bgCol.slice(1);
          winnerInfo = num.option == 0 ? `${props.prizeNumber}` : `${props.prizeNumber} ${color}`;
        }
      });
      return (
        <div className={`${col.charAt(0).toLowerCase()}${col.slice(1)}BG`}>{winnerInfo}</div>
      );
    }
  }

  const calculateWinnings = (winNum) => {
    const rowOne = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    const rowTwo = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    const rowThree = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    const firstTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const secondTwelve = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const thirdTwelve = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const firstHalf = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const secondHalf = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
    const odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
    const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    let winningTotal = 0;

    for (const [key, value] of Object.entries(props.selectedSquares)) {
      if (winNum.toString() === key) winningTotal += (value * 35) + value;

      const calculate = (arr, num) => {
        arr.map(sqNum => {
          if (sqNum === winNum) winningTotal += value * num;
        });
      }

      switch (key) {
        case 'row-1':
          calculate(rowOne, 3);
          break;
        case 'row-2':
          calculate(rowTwo, 3);
          break;
        case 'row-3':
          calculate(rowThree, 3);
          break;
        case '1st 12':
          calculate(firstTwelve, 3);
          break;
        case '2nd 12':
          calculate(secondTwelve, 3);
          break;
        case '3rd 12':
          calculate(thirdTwelve, 3);
          break;
        case '1 to 18':
          calculate(firstHalf, 2);
          break;
        case '19 to 36':
          calculate(secondHalf, 2);
          break;
        case 'EVEN':
          calculate(even, 2);
          break;
        case 'ODD':
          calculate(odd, 2);
          break;
        case 'RED':
          calculate(red, 2);
          break;
        case 'BLACK':
          calculate(black, 2);
          break;
      }
    }

    props.setBalance(props.balance + winningTotal);
    props.setWinTotal(winningTotal)
  }

  useEffect(() => {
    if (props.winMarker) calculateWinnings(parseInt(props.prizeNumber, 10));
  }, [props.winMarker]);

  const setOutsideSquare = (num, id) => {
    return (
      <Square
        isDisabled={props.isDisabled}
        type={'Outside'}
        num={num}
        id={id}
        betUnit={props.betUnit}
        reset={props.reset}
        betSum={props.betSum}
        setBetSum={props.setBetSum}
        balance={props.balance}
        setBalance={props.setBalance}
        setSelectedSquares={props.setSelectedSquares}
      />
    )
  }

  const setInsideSquare = (num) => {
    let [backgroundColor, textColor] = '';

    if (props.data.InsideData) {
      props.data.InsideData.find(el => {
        if (el.option === num.toString()) {
          backgroundColor = el.style.backgroundColor;
          textColor = el.style.textColor;
        }
      });
    }

    return (
      <Square
        isDisabled={props.isDisabled}
        type={'Inside'}
        num={num}
        key={num}
        prizeNumber={props.prizeNumber}
        betUnit={props.betUnit}
        reset={props.reset}
        betSum={props.betSum}
        setBetSum={props.setBetSum}
        balance={props.balance}
        setBalance={props.setBalance}
        winMarker={props.winMarker}
        setSelectedSquares={props.setSelectedSquares}
        style={
          {
            backgroundColor: backgroundColor,
            color: textColor
          }}
      />
    )
  }

  const renderSquares = (num) => {
    let squares = [];
    for (let i = num; i <= num + 9; i += 3) {
      squares.push(setInsideSquare(i));
    }
    return squares;
  }

  const closeModalAddons = () => {
    if (props.balance < props.betSum) {
      props.setReset(true);
      setTimeout(() => props.setReset(false), 500);
      props.setBetSum(0);
      props.setSelectedSquares({});
    } else {
      props.setBalance(props.balance - props.betSum);
    }

    props.setIsDisabled(false);
  }

  return (
    <div>
      <div>
        {props.displayModal &&
          <Modal
            setDisplayModal={props.setDisplayModal}
            closeModalAddons={closeModalAddons}
            info={
              <div>
                <div>{props.prizeNumber && getWinNum()}</div>
                <div>Winnings: ${props.winTotal}</div>
                <div>Balance: ${props.balance}</div>
              </div>
            }
          />
        }
      </div>
      <div className='tableContainer'>
        <div className='table' disabled={props.isDisabled}>
          <div className='tableCol'>
            <div className='zero flex'>
              {setInsideSquare(0)}
            </div>
          </div>
          <div className='tableCol'>
            <div className='flex squares'>
              {renderSquares(3)}
            </div>
            <div className='flex squares'>
              {renderSquares(2)}
            </div>
            <div className='flex squares'>
              {renderSquares(1)}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('1st 12')}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('1 to 18')}
              {setOutsideSquare('EVEN')}
            </div>
          </div>
          <div className='tableCol'>
            <div className='flex squares'>
              {renderSquares(15)}
            </div>
            <div className='flex squares'>
              {renderSquares(14)}
            </div>
            <div className='flex squares'>
              {renderSquares(13)}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('2nd 12')}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('RED')}
              {setOutsideSquare('BLACK')}
            </div>
          </div>
          <div className='tableCol'>
            <div className='flex squares'>
              {renderSquares(27)}
            </div>
            <div className='flex squares'>
              {renderSquares(26)}
            </div>
            <div className='flex squares'>
              {renderSquares(25)}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('3rd 12')}
            </div>
            <div className='flex squares'>
              {setOutsideSquare('ODD')}
              {setOutsideSquare('19 to 36')}
            </div>
          </div>
          <div className='tableCol'>
            <div className='flex squares side'>
              {setOutsideSquare('2 to 1', 1)}
            </div>
            <div className='flex squares side'>
              {setOutsideSquare('2 to 1', 2)}
            </div>
            <div className='flex squares side'>
              {setOutsideSquare('2 to 1', 3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
