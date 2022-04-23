import './WheelCmp.css';
import { Wheel } from 'react-custom-roulette';

export const WheelCmp = (props) => {
  return (
    <div className="wheel flex">
      <Wheel
        mustStartSpinning={props.mustSpin}
        prizeNumber={props.prizeNumber}
        data={props.data}
        outerBorderWidth={5}
        radiusLineWidth={0}
        radiusLineColor={'white'}
        fontSize={24}
        textDistance={90}
        perpendicularText={true}
        onStopSpinning={() => {
          let winningNumber = props.data[props.prizeNumber].option;
          let arrow = document.querySelector('.wheel img[alt~="roulette-static"]');
          
          arrow.classList.remove('arrowAnim');          
          props.setMustSpin(false);
          props.setPrizeNumber(winningNumber);
          props.setWinMarker(true);
          props.setDisplayModal(true);
        }}
      />
    </div>
  );
}

export default WheelCmp;
