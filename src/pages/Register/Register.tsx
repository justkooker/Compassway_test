import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import RegisterForm from "../../components/RegisterForm";

import { UserFormData } from "../../types/userTypes";
import { baseUrl } from "../../assets/vars";

function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    !!localStorage.getItem("userDataAuth") && navigate("/");
  }, []);
  const registerUser = async (data: UserFormData) => {

    try {
      const registerRequest = await axios.post(
        `${baseUrl}users/`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User registered succesfuly", registerRequest.data);
      localStorage.setItem("isRegistered", JSON.stringify(true));
      navigate("/login");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <RegisterForm submitForm={registerUser} />
    </>
  );
}

export default Register;
