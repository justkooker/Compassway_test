import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

import LoginForm from "../../components/LoginForm";

import { UserFormData } from "../../types/userTypes";
import { baseUrl } from "../../assets/vars";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !!localStorage.getItem("userDataAuth") && navigate("/");
  }, []);

  const handleLogin = async (data: UserFormData) => {
    const { username, password } = data;
    const encodeBase64 = () => {
      return btoa(`${username}:${password}`);
    };

    try {
      const base64Auth = encodeBase64();

      const loginRequest = await axios.get(`${baseUrl}users/current/`, {
        headers: {
          Authorization: `Basic ${base64Auth}`,
        },
      });
      const userInfo = {
        username: loginRequest.data.username,
        password: password,
      };
      dispatch(login({ isAuthenticated: true }));
      localStorage.setItem("userDataAuth", JSON.stringify(userInfo));
      localStorage.setItem("isAuthentificated", JSON.stringify(true));
      navigate("/");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <LoginForm submitForm={handleLogin} />
    </>
  );
}

export default Login;
