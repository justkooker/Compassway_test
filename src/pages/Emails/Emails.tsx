import { useEffect, useState } from "react";
import axios from "axios";

import LogoutBtn from "../../components/LogoutBtn";

import s from "./Emails.module.scss";

import { baseUrl } from "../../assets/vars";
import { encodeBase64 } from "../../helpers";
import NewLetter from "../../components/NewLetter";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setEmails } from "../../store/emailsSlice";
import { RootState } from "../../store/store";

interface User {
  username: string;
  email: string;
}
const Emails = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisibleNewLetter, setIsVisibleNewLetter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailQuantity, setEmailQuantity] = useState(0);
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const emailsOnPage = 5;
  const userAuthString = localStorage.getItem("userDataAuth");
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const currentUserEmail = useSelector(
    (state: RootState) => state.emails.currentUser
  );
  const emails = useSelector((state: RootState) => state.emails.emails);
  useEffect(() => {
    if (userAuth && userAuth.username && userAuth.password) {
      const base64Auth = encodeBase64(userAuth.username, userAuth.password);

      try {
        axios
          .get(`${baseUrl}users/current/`, {
            headers: {
              Authorization: `Basic ${base64Auth}`,
            },
          })
          .then((response) => {
            setUser(response.data);
            if (response.data.email !== currentUserEmail) {
              dispatch(
                setCurrentUser({
                  currentUser: response.data.email,
                  userId: response.data.id,
                })
              );
            }

            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    }
  }, []);
  const getEmails = () => {
    if (userAuth && userAuth.username && userAuth.password) {
      const base64Auth = encodeBase64(userAuth.username, userAuth.password);
      try {
        axios
          .get(`${baseUrl}emails/?limit=${emailsOnPage}`, {
            headers: {
              Authorization: `Basic ${base64Auth}`,
            },
          })
          .then((response) => {
            setNextPage(response.data.next);
            setEmailQuantity(response.data.count);
            dispatch(setEmails(response.data.results));
          });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
  };
  useEffect(() => {
    getEmails();
  }, [emailQuantity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User data not found.</div>;
  }
  const toggleNewLetter = () => setIsVisibleNewLetter((prev) => !prev);

  const gotoNextPage = () => {
    const base64Auth = encodeBase64(userAuth.username, userAuth.password);
    try {
      axios
        .get(nextPage, {
          headers: {
            Authorization: `Basic ${base64Auth}`,
          },
        })
        .then((response) => {
          setNextPage(response.data.next);
          setPrevPage(response.data.previous);
          setCurrentPage((prev) => prev + 1);
          dispatch(setEmails(response.data.results));
        });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  const gotoPrevPage = () => {
    const base64Auth = encodeBase64(userAuth.username, userAuth.password);
    try {
      axios
        .get(prevPage, {
          headers: {
            Authorization: `Basic ${base64Auth}`,
          },
        })
        .then((response) => {
          setPrevPage(response.data.previous);
          setNextPage(response.data.next);
          setCurrentPage((prev) => prev - 1);
          dispatch(setEmails(response.data.results));
        });
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <div className={s.emails}>
      <div className={s.user}>
        <div className={s.user__info}>
          <span>{user.username}</span>
          <span>{user.email}</span>
        </div>
        <LogoutBtn />
      </div>
      <button onClick={toggleNewLetter} className={s.newBtn}>
        New letter
      </button>
      <table>
        <thead>
          <tr>
            <th className={s.th}>Id</th>
            <th className={s.th}>Recipient</th>
            <th className={s.th}>Subject</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => {
            return (
              <tr key={email.id}>
                <td>{email.id}</td>
                <td>{email.recipient}</td>
                <td>{email.subject}</td>
              </tr>
            );
          })}
          <tr>
            <td className={s.total} colSpan={3}>
              Total {emailQuantity}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={s.pagination}>
        <button
          onClick={gotoPrevPage}
          disabled={!!!prevPage}
          className={s.pagination__btn}
        >
          Prev
        </button>
        <span className={s.pagination__page}>
          Page {currentPage} of{" "}
          {!emailQuantity ? 1 : Math.ceil(emailQuantity / emailsOnPage)}
        </span>
        <button
          onClick={gotoNextPage}
          disabled={!!!nextPage}
          className={s.pagination__btn}
        >
          Next
        </button>
      </div>
      {isVisibleNewLetter && (
        <NewLetter getEmails={getEmails} toggleNewLetter={toggleNewLetter} />
      )}
    </div>
  );
};

export default Emails;
