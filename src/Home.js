import React, { useState } from "react";
import NavBar from "./components/Navbar/Navbar";
import Alert from "./components/Alert";
import FormControl from "./components/FormControl";
import SocialMedia from "./components/SocialIcons";
import { FaCoins } from "react-icons/fa";

const Home = () => {
  // notification
  const [alertMsg, setAlertMsg] = useState({
    type: "",
    msg: "",
  });
  return (
    <>
      <div className="main">
        <NavBar />
        <h1 className="main-title">
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
