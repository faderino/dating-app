import { useState } from 'react';

const useModal = (): {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
} => {
  const [showModal, setShowModal] = useState(false);

  return {
    showModal,
    openModal: () => {
      setShowModal(true);
    },
    closeModal: () => {
      setShowModal(false);
    },
  };
};

export default useModal;
