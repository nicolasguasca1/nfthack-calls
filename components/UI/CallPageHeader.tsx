import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faCommentAlt,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/CallPageHeader.module.css";
import { formatDate } from "../../utils/helpers";

const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert
}: any) => {
  let interval: any = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.frame_header}>
      <div className={styles.header_items}>
        <FontAwesomeIcon className={styles.icon} icon={faUserFriends} />
      </div>
      <div
        className={styles.header_items}
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        <FontAwesomeIcon className={styles.icon} icon={faCommentAlt} />
        {!isMessenger && messageAlert.alert && (
          <span className={styles.alert_circle_icon}></span>
        )}
      </div>
      <div className={(styles.header_items, styles.date_block)}>
        {currentTime}
      </div>
      <div className={styles.header_items}>
        <FontAwesomeIcon className={styles.profile} icon={faUserCircle} />
      </div>
    </div>
  );
};

export default CallPageHeader;
