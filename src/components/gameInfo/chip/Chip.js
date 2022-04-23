import './Chip.css';
import React, { useState, useRef, useEffect } from 'react';

export const Chip = (props) => {
  const [selected, setSelected] = useState(props?.default||false);
  const chipRef = useRef(null);

  useEffect(() => {
    if (props.selectedChip && chipRef.current.id !== props.selectedChip.current.id && selected) {
      setSelected(false);
    }
  }, [props.selectedChip]);

  useEffect(() => {
    if (selected) {
      chipRef.current.classList.add('chipSelected');
      props.setBetUnit(props.value);
      props.setSelectedChip(chipRef);
    } else {
      chipRef.current.classList.remove('chipSelected');
    }
  }, [selected]);

  return (
    <div
      ref={chipRef}
      id={props.value}
      className={props.chipStyle}
      onClick={() => {
        if (!selected) setSelected(true);
      }}
    >${props.value}
    </div>
  );
}

export default Chip;
