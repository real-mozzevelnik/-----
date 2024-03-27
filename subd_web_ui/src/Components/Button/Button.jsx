/* eslint-disable react/prop-types */
import "./Button.css";

export default function Button({ children, onClick, isActive }) {
  let classes = "button";
  if (isActive) classes += " active";
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
