import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdLocationOn } from "react-icons/md";

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-cta">
        <div className="footer-logo">
          <div className="text-footer">
            <p>HAPPINESS IS YOUR COLOR</p>
          </div>
          <img className="logo" src="/flogo.png" alt="Footer Logo" />
        </div>

        <div className="single-cta">
          <i className="fa-map-marker"></i>
          <i className="fa-envelope">
            <MdLocationOn className=" icon1" />
          </i>
          <div className="cta-text">
            <h4>Find us</h4>
            <span>Tel Aviv Yafo 117</span>
          </div>
        </div>
        <div className="single-cta">
          <i className="fa-envelope">
            <FaWhatsapp className=" icon1" />
          </i>
          <div className="cta-text">
            <h4>Call us</h4>
            <span>+972 60 212 248</span>
          </div>
        </div>
        <div className="single-cta">
          <i className="fa-envelope">
            <SiGmail className="icon1" />
          </i>
          <div className="cta-text-mail">
            <h4>Mail us</h4>
            <span>fllorMar@Gmail.com</span>
          </div>{" "}
        </div>

        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@1,600&display=swap"
          rel="stylesheet"
        />

        <div class="social-links">
          <div class="social-btn flex-center" id="Instegram">
            <FaInstagram className="icon" />
            <svg
              xmlns="https://www.instagram.com/flormarisrael/?hl=he"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              {" "}
            </svg>
            <span>@SquiresChance</span>
          </div>

          <div class="social-btn flex-center" id="linkedin">
            <CiFacebook className="icon" />
            <svg
              xmlns="https://www.facebook.com/Flormar.Israel/?locale=he_IL"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              {" "}
            </svg>
            <span>Facebook</span>
          </div>

          <div class="social-btn flex-center" id="github">
            <FaTiktok className="icon" />
            <svg
              xmlns="https://www.tiktok.com/@flormar.israel"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            ></svg>
            <span>Tiktok</span>
          </div>
        </div>
      </div>
      <div className="black">
        <span>©2009-2024 כל הזכויות </span>
      </div>
    </footer>
  );
};

export default Footer;
