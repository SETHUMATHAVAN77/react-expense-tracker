import React, { useState } from "react";
import Alert from "./components/Alert";
import FormControl from "./components/FormControl";
import SocialMedia from "./components/SocialIcons";
import { FaCoins } from "react-icons/fa";

const App = () => {
  // notification
  const [alertMsg, setAlertMsg] = useState({
    type: "",
    msg: "",
  });

  return (
    <>
      <h1 className="main-title">
        Expense Tracker <FaCoins />
      </h1>
      <Alert {...alertMsg} showAlert={setAlertMsg} />
      <FormControl showAlert={setAlertMsg} />
      <SocialMedia />
    </>
  );
};

export default App;
