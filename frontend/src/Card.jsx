import "./Card.css";
import { Link } from "react-router-dom";
import "./Card.css";
function Card(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <img
        src={props.image_dest}
        alt="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
      />
      <h2>{props.title}</h2>
      <p className="desc">{props.des}</p>
      <p className="explore">
        <span>Explore</span>
        <svg
          className="arrow-icon"
          width="28"
          height="28"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 15H25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 8L25 15L18 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </p>
    </div>
  );
}

export default Card;
