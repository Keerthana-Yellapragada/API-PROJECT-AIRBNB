import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import "../../context/Modal.css"
import DeleteSpotForm from '.';
import {
  closeProp
} from "../../context/Modal"

function DeleteSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal=() => {
    setShowModal(false)
  }

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>Delete this Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSpotForm closeProp={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotFormModal;
