import React from "react";

import s from "./AuthInput.module.scss";

interface AuthInputProps {
  label?: string;
  placeholder?: string;
  handleVal: (value: string) => void;
  value: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label = "",
  placeholder,
  handleVal,
  value,
}) => {

  return (
    <>
      {label && (
        <label>
          {label}
          <input
            
            onChange={(e) => handleVal(e.target.value)}
            type="text"
            placeholder={placeholder}
            className={s.input}
            value={value}
          />
        </label>
      )}
    </>
  );
};

export default AuthInput;
