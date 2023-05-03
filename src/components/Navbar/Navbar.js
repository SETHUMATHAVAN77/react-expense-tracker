import React from "react";

import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import userLogo from "../../assets/images/user.jpg";
import { FaBars } from "react-icons/fa";

import "../Navbar/Navbar.css";

const NavBar = () => {
  const { user, imageAsset } = UserAuth();
  const renderTooltip = (props) => (
    <Tooltip
      className="text-white bg-black/20 ml-2 px-3 py-1 rounded-lg text-xs md:text-base mr-2"
      id="button-tooltip"
      {...props}
    >
      Profile
    </Tooltip>
  );
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.0GSgM1qDkiJ0A_TITg_4tgHaE9&pid=Api&P=0"
            alt="safari"
            className="logo"
          />
          <button className="nav-toggle">
            <FaBars />
          </button>
        </div>
        <div className="flex gap-x-3 items-center">
          <OverlayTrigger
            placement="left"
            delay={{ show: 200, hide: 100 }}
            overlay={renderTooltip}
          >
            <div>
              <Link to={`/userinfo/${user?.uid}`}>
                <img
                  src={`${imageAsset ? imageAsset : userLogo}`}
                  alt="user-logo"
                  className="w-[40px] h-[40px] rounded-full"
                />
              </Link>
            </div>
          </OverlayTrigger>
          <Link
            to={"/"}
            className="px-5 py-3 font-semibold rounded-xl bg-red-600 text-white cursor-pointer"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
