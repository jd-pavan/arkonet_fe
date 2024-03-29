import { useNavigate } from "react-router-dom";
import style from "./NotificationBell.module.css";

function NotificationBell(props) {
  const Navigate = useNavigate();
  return (
    <div className={`${style.notificationbell}`} onClick={() => Navigate("/client/notificationsClient")}>
      <i className={`fa-regular fa-bell fa-bell-large`} style={{ fontSize: "1.5rem" }}></i>
      {props.no_of_notifications > 0 && <span className={`${style.notific_no} badge rounded-pill badge-notification bg-danger`}  >
        {props.no_of_notifications}
      </span>}
    </div>
  );
}
export default NotificationBell;
