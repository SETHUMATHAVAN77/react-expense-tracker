import React, { useEffect, useState } from "react";
import NavBar from "./components/Navbar/Navbar";
import Alert from "./components/Alert";
import FormControl from "./components/FormControl";
import SocialMedia from "./components/SocialIcons";
import { FaCoins } from "react-icons/fa";
import { UserAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

const Home = ({ fetchUserDetails }) => {
  const { user } = UserAuth();
  // notification
  const [alertMsg, setAlertMsg] = useState({
    type: "",
    msg: "",
  });

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.uid]);
  return (
    <>
      <div className="main">
        <NavBar />
        <ToastContainer position="top-right" />
        <h1 className="main-title flex gap-x-2">
          <FaCoins />
          Expense Tracker
        </h1>
        <Alert {...alertMsg} showAlert={setAlertMsg} />
        <FormControl showAlert={setAlertMsg} />
        <SocialMedia />
      </div>
    </>
  );
};

export default Home;
