import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faTimes,
  faUser,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/MeetingInfo.module.css";

import { useContext } from "react";
import { SocketContext } from "../../Store";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useRouter } from "next/router";

// const MeetingInfo = ({ setMeetInfoPopup, url }: any) => {
//   return (
//     <div className={styles.meeting_info_block}>
//       <div className={styles.meeting_header}>
//         <h3 className={styles.h3}>Your meeting`s ready</h3>
//         <FontAwesomeIcon
//           className={styles.icon}
//           icon={faTimes}
//           onClick={() => {
//             setMeetInfoPopup(false);
//           }}
//         />
//       </div>
//       <button className={styles.add_people_btn}>
//         <FontAwesomeIcon className={styles.icon_add_ppl} icon={faUser} />
//         Add Others
//       </button>
//       <p className={styles.info_text}>
//         Or share this meeting link with others you want in the meeting
//       </p>
//       <div className={styles.meet_link}>
//         <span className={styles.span}>{url}</span>
//         <FontAwesomeIcon
//           className={styles.icon_span_meet_link}
//           icon={faCopy}
//           onClick={() => navigator.clipboard.writeText(url)}
//         />
//       </div>
//       <div className={styles.permission_text}>
//         <FontAwesomeIcon
//           className={`${styles.icon_permission} ${styles.red}`}
//           icon={faShieldAlt}
//         />
//         <p className={styles.small_text}>
//           People who use this meeting link must get your permission before they
//           can join.
//         </p>
//       </div>
//       <p className={styles.small_text}>Joined as akshay@gmail.com</p>
//     </div>
//   );
// };

const MeetingInfo = ({ setMeetInfoPopup }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    isAuthenticated,
    logout,
    user
  } = useContext<any>(SocketContext);
  const router = useRouter();

  const endpoint = `${process.env.NEXT_PUBLIC_ENDPOINT}${router.asPath}`;
  const url = `${endpoint}/${me}`;

  return (
    <div className={styles.meeting_info_block}>
      <div className={styles.meeting_header}>
        <h3 className={styles.h3}>Your meeting`s ready</h3>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      {/* <button className={styles.add_people_btn}>
        <FontAwesomeIcon className={styles.icon_add_ppl} icon={faUser} />
        Add Others
      </button> */}
      <p className={styles.info_text}>
        Share this link with the person you want in the meeting
      </p>
      <div className={styles.meet_link}>
        <CopyToClipboard text={url}>
          <FontAwesomeIcon
            className={styles.icon_span_meet_link}
            icon={faCopy}
            // onClick={() => navigator.clipboard.writeText(url)}
          />
        </CopyToClipboard>
        <span className={styles.span}>{`\u00A0\u00A0${url}`}</span>
      </div>
      <div className={styles.permission_text}>
        <FontAwesomeIcon
          className={`${styles.icon_permission} ${styles.red}`}
          icon={faShieldAlt}
        />
        <p className={styles.small_text}>
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
      <p className={styles.small_text}>
        Joined as {user?.attributes.username}{" "}
      </p>
    </div>
  );
};

export default MeetingInfo;
