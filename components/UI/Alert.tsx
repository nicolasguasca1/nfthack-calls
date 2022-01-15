import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Alert.module.css";

const Alert = ({ messageAlert }) => {
  return (
    <div className={styles.message_alert_popup}>
      <div className={styles.alert_header}>
        <FontAwesomeIcon className={styles.icon} icon={faCommentAlt} />
        <h3 className={styles.h3}>{messageAlert.payload.user}</h3>
      </div>
      <p className={styles.alert_msg}>{messageAlert.payload.msg}</p>
    </div>
  );
};

export default Alert;
