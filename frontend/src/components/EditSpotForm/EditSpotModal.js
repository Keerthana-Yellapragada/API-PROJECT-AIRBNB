import React, { useState } from 'react';
import CreateReviewForm from '.';
import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import EditSpotForm from '.';
import {
  closeProp
} from "../../context/Modal"

function EditSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
  }

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>Update Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm closeProp={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
