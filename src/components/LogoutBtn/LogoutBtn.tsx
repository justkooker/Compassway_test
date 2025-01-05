import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

import s from "./LogoutBtn.module.scss";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("userDataAuth");
    localStorage.setItem("isAuthentificated", JSON.stringify(false));
    dispatch(logout({ isAuthenticated: false }));
  };
  return (
    <button className={s.button} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;
