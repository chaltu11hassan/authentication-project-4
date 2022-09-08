import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
// import { TokenExpiredError } from "jsonwebtoken";

const baseURL = "https://socialmtn.devmountain.com";

const Auth = () => {
  const authCtx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitHandler called");

    const body = {
      username,
      password,
    };

    axios
      .post(register ? `${baseURL}/register` : `${baseURL}/login`, body)
      .then((res) => {
        console.log("AFTER AUTH", res.data);
        authCtx.login(res.data.token, res.data.expirationTime, res.data.userId);

      })
      .catch((err) => {
        setUsername("");
        setPassword("");
      });

    
  };

  return (
    <main>
      <h1>Welcome!</h1>

      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter username here"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="enter password here"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>

      <button className="form-btn">
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
