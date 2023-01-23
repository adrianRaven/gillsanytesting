import "../css/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="footer-contenedor">
      <div className="footer-title">GILLSANY</div>{" "}
      <div className="footer-section-social">
        <div className="icons-socialMedia">
          <div className="facebook-icon">
            <a
              href="https://www.facebook.com/gillsany.mx"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />{" "}
            </a>
          </div>
          <div className="twitter-icon">
            <a
              href="https://twitter.com/gillsany"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className="instagram-icon">
            <a
              href="https://www.instagram.com/gillsany.mx/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div className="youtube-icon">
            <a
              href="https://www.youtube.com/channel/UCTJu8pudB5MTKE1Nx9GJRxg"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <div className="tiktok-icon">
            <a
              href="https://www.tiktok.com/@gillsany"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>
        <div className="icons-legend">
          <div className="text-legend">
            Copyright Todos los derechos reservados
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
