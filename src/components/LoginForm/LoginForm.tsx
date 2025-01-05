import React from "react";
import { useState } from "react";

import AuthInput from "../AuthInput";

import { UserFormData } from "../../types/userTypes";

import { Link } from "react-router-dom";

interface LoginFormProps {
  submitForm: (data: UserFormData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ submitForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (val: string) => setUsername(val);
  const handlePassword = (val: string) => setPassword(val);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, password };
    submitForm(userData);
  };
  return (
    <>
      <form className="form" onSubmit={onSubmit}>
        <AuthInput
          handleVal={handleLogin}
          placeholder="Enter your user name"
          label="Username"
          value={username}
        />
        <AuthInput
          handleVal={handlePassword}
          placeholder="Enter your password"
          label="Password"
          value={password}
        />
        <button className="btn" type="submit">
          Log In
        </button>
        <p>
          No account? <Link to="/register"> Register</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
