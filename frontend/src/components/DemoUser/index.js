
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUserLoginButton() {
  const dispatch = useDispatch();

  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({
      credential: "Demo-lition", password: "password"
    }))
  };

  return (
    <>
      <button onClick={handleSubmit} className="DemoUser-login-button" type="submit">Log In as Demo User</button>
    </>
  );
}

export default DemoUserLoginButton;
