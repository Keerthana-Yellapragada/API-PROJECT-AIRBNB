
import React, { useEffect,useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors=[];

    if(credential && !credential.includes('@')){errors.push("Please provide a valid email")}
  }, [credential,password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className='login-form-container' onSubmit={handleSubmit}>
      <h1>Welcome Back!</h1>
      <div >
        {errors.map((error, idx) => (
          <div className="errors" key={idx}>{error}</div>
        ))}
      </div>

        <input
          className="input-field"
          type="text"
          placeholder="Username or Email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <button className="login-button" type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
