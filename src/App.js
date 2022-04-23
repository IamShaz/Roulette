import './App.css';
import { WheelCmp } from './components/wheelCmp/WheelCmp';
import { Table } from './components/table/Table';
import { GameControls } from './components/gameControls/GameControls';
import { GameInfo } from './components/gameInfo/GameInfo';
import { data } from './data';
import React, { useState } from 'react';

function App() {

  const [appData, setAppData] = useState(data);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [betUnit, setBetUnit] = useState(1);
  const [betSum, setBetSum] = useState(0);
  const [reset, setReset] = useState(false);
  const [balance, setBalance] = useState(100);
  const [winTotal, setWinTotal] = useState(0);
  const [winMarker, setWinMarker] = useState(false);
  const [selectedSquares, setSelectedSquares] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Roulette</h1>
      </header>
      <div className='gameContainer flex'>
        <div className='game'>
          <WheelCmp
            data={appData.InsideData}
            {...{
              mustSpin,
              setMustSpin,
              prizeNumber,
              setPrizeNumber,
              setWinMarker,
              setDisplayModal
            }}
          />
          <div className='tableInfo'>
            <Table
              data={appData}
              {...{
                prizeNumber,
                betUnit,
                reset,
                setReset,
                betSum,
                setBetSum,
                balance,
                setBalance,
                winMarker,
                selectedSquares,
                setSelectedSquares,
                winTotal,
                setWinTotal,
                displayModal,
                setDisplayModal,
                isDisabled,
                setIsDisabled
              }}
            />
            <GameControls
              data={appData}
              {...{
                setMustSpin,
                setPrizeNumber,
                betSum,
                setBetSum,
                setReset,
                balance,
                setBalance,
                winMarker,
                setWinMarker,
                setSelectedSquares,
                setWinTotal,
                isDisabled,
                setIsDisabled
              }}
            />
            <GameInfo
              {...{
                setBetUnit,
                betSum,
                balance
              }}
            />
          </div>
        </div>

      </div>
      <div className='chairContainer'>
        <div className="chair chair-lg chairOne"></div>
        <div className="chair chair-lg"></div>
        <div className="chair chair-lg chairTwo"></div>
      </div>
    </div>
  );
}

export default App;
