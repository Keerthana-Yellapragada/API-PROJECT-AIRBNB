import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import DemoUserLoginButton from "../DemoUser/index"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="login-signup-modal-buttons" onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
          <DemoUserLoginButton />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
