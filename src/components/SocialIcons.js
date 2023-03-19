import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const SocialIcons = () => {
  return (
    <>
      <div className="social-icon">
        <a href="https://www.instagram.com/mathav._.07/">
          <div className="fa-instagram icons">
            <FaInstagram />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/sethumathavan-g-a987bb190/">
          <div className="fa-linkedin icons">
            <FaLinkedin />
          </div>
        </a>
        <a href="https://github.com/SETHUMATHAVAN77">
          <div className="fa-github icons">
            <FaGithub />
          </div>
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
