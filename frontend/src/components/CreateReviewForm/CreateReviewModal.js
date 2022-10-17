import React, { useState } from 'react';
import CreateReviewForm from '.';
import { Modal } from '../../context/Modal';
import "../../context/Modal"

function CreateReviewFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
  }

  return (
    <>
      <button className="leave-review-button" onClick={() => setShowModal(true)}>Leave A Review!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm  closeModal={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;
