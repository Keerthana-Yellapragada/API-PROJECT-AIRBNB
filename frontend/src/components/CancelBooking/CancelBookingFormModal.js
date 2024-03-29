import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import CancelBookingForm from '.';
// import {
//   closeModal
// } from "../../context/Modal"

function CancelBookingFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
  }

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>Cancel Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CancelBookingForm closeModal={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default CancelBookingFormModal;
