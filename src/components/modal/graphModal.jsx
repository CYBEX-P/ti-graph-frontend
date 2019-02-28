import React, { useContext } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalContext from '../App/ModalContext';
import MenuContext from '../App/MenuContext';
import { UnstyledButton } from '../__styles__/styles';

Modal.setAppElement('#root');

const GraphModal = () => {
  const { isShowingModal, dispatchModal } = useContext(ModalContext);
  const { dispatchExpand } = useContext(MenuContext);
  return (
    <Modal isOpen={isShowingModal} onAfterOpen={() => dispatchExpand('none')} contentLabel="Example Modal">
      <UnstyledButton onClick={() => dispatchModal(false)}>
        <FontAwesomeIcon icon="times" />
      </UnstyledButton>
    </Modal>
  );
};

export default GraphModal;
