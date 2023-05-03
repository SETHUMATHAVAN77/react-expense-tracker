import React, { useEffect } from "react";

// user context
import { UserAuth } from "./context/AuthContext";
// firebase
import { db } from "./utils/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/Login";

import UserInfo from "./pages/UserInfo";
import AddProfile from "./pages/AddProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";

const App = () => {
  const {
    user,
    setUserName,
    setImageAsset,
    setEmail,
    setNumber,
    setAddress,
    setDocId,
    setUserId,
  } = UserAuth();

  // getting user profile
  const fetchUserDetails = async () => {
    if (user && user?.uid) {
      const q = query(
        collection(db, "userInfo"),
        where("userId", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.docs.map((doc) => {
        setDocId(doc.id);
        const userData = doc.data();
        console.log(userData.userId);
        if (userData) {
          setUserId(userData.userId);
          setUserName(userData.userName);
          setImageAsset(userData.image);
          setEmail(userData.email);
          setNumber(userData.number);
          setAddress(userData.address);
        }
        return doc.id;
      });
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user?.uid]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={<Home fetchUserDetails={fetchUserDetails} />}
          />

          <Route
            path="/userinfo/:id"
            element={<UserInfo fetchUserDetails={fetchUserDetails} />}
          />
          <Route path="/addprofile" element={<AddProfile />} />
          <Route path="/editprofile/:id" element={<AddProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
