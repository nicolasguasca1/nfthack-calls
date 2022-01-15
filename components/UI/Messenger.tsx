import { useState } from "react";
import styles from "../../styles/Messenger.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../utils/helpers";

// const Messenger = ({ setIsMessenger, sendMsg, messageList }: any) => {
//   const [msg, setMsg] = useState("");

//   const handleChangeMsg = (e: any) => {
//     setMsg(e.target.value);
//   };

//   const handleKeyDown = (e: any) => {
//     if (e.key === "Enter") {
//       sendMsg(msg);
//       setMsg("");
//     }
//   };

//   const handleSendMsg = () => {
//     sendMsg(msg);
//     setMsg("");
//   };

const Messenger = ({ setIsMessenger }) => {
  const [msg, setMsg] = useState("");

  const handleChangeMsg = (e: any) => {
    setMsg(e.target.value);
  };

  // const handleKeyDown = (e: any) => {
  //   if (e.key === "Enter") {
  //     sendMsg(msg);
  //     setMsg("");
  //   }
  // };

  // const handleSendMsg = () => {
  //   sendMsg(msg);
  //   setMsg("");
  // };

  return (
    <div className={styles.messenger_container}>
      <div className={styles.messenger_header}>
        <h3 className={styles.h3}>Interactions </h3>
        <FontAwesomeIcon
          className={styles.icon_messenger_container}
          icon={faTimes}
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className={styles.messenger_header_tabs}>
        <div className={styles.tab}>
          <FontAwesomeIcon
            className={styles.icon_messenger_container}
            icon={faUserFriends}
          />
          <p className={styles.p}>People (1)</p>
        </div>
        <div className={styles.active}>
          <FontAwesomeIcon
            className={styles.icon_messenger_container}
            icon={faCommentAlt}
          />
          <p className={styles.p}>Chat</p>
        </div>
      </div>

      <div className={styles.chat_section}>
        {/* {messageList.map((item: any) => ( */}
        <div
          // key={item.time}
          className={styles.chat_block}
        >
          <div className={styles.sender}>
            {/* {item.user}  */}
            you
            <small className={styles.small}>
              {/* {formatDate(item.time)} */}
              10PM
            </small>
          </div>
          <p className={styles.msg}>
            {/* {item.msg} */}
            Here comes an actual msg
          </p>
        </div>
        {/* ))} */}
      </div>

      <div className={styles.send_msg_section}>
        <input
          className={styles.input}
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          // onKeyDown={(e) => handleKeyDown(e)}
        />
        <FontAwesomeIcon
          className={styles.icon_send_message_section}
          icon={faPaperPlane}
          // onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Messenger;
