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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (val: string) => setUsername(val);
  const handleEmail = (val: string) => setEmail(val);
  const handlePassword = (val: string) => setPassword(val);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { username, email, password };
    submitForm(userData);
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <AuthInput
        handleVal={handleUserName}
        placeholder="Enter your login"
        label="Name"
        value={username}
      />
      <AuthInput
        handleVal={handleEmail}
        placeholder="Enter your email"
        label="Email"
        value={email}
      />
      <AuthInput
        handleVal={handlePassword}
        placeholder="Enter your password"
        label="Password"
        value={password}
      />
      <button className="btn" type="submit">
        Register
      </button>
      <p>
        Have an account <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default LoginForm;
