import './Modal.css';

export const Modal = (props) => {
  const closeModal = () => {
    props.setDisplayModal(false);
    if (props.closeModalAddons) props.closeModalAddons();
  }

  return (
    <div className='modalBG flex'>
      <div className='modalSubBG flex'>
        <div className='modalContainer'>
          <div className="closeModal">
            <span onClick={() => closeModal()}>X</span>
          </div>
          <div className='modal flex'>
            <div className='info'>{props.info}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
